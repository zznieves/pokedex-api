
// import the Express module into the file
import express, { query } from 'express';
import dbQuery from './db';


// create a router for requests using the '/pokedex' path
const pokedexRouter = express.Router();


// GET: route for initial pokedex render (basic data)
pokedexRouter.get('/', async (req: express.Request, res: express.Response) => {

    // attempt to query the database
    try {

        const result = await dbQuery("SELECT id, name, type_a, type_b FROM pokemon", []);
        res.json(result.rows);

    } catch(error) {

        console.error("Error occurred while attempting to execute query: ", error);
        res.status(500).json({error: "Internal server error"});
    }
});

/**
 * GET: route for searching through name, type_a, and type_b for a match with
 *  given substring
 */
pokedexRouter.get('/search', async (req: express.Request, res: express.Response) => {

    // we are expecting a search string to be included with this request
    const searchString: string = req.query.searchString as string;
    console.log("Search String: ", searchString)

    const queryString: string = `
    SELECT
        p.id, p.name, p.type_a, p.type_b
    FROM
        pokemon p
    WHERE
        p.name ILIKE $1
    OR  p.type_a ILIKE $1
    OR  p.type_b ILIKE $1
    `;


    // attempt to query the database
    try {
        const result = await dbQuery(queryString, [`%${searchString}%`]);
        console.log(result.rows);
        res.json(result.rows);

    } catch (error) {
        
        console.error("Error occurred while attempting to execute query: ", error);
        res.status(500).json({error: "Search attempt failed."});
    }



});


/**
 * GET: route for requesting all data for selected pokemon
 */
pokedexRouter.get('/:id', async (req: express.Request, res: express.Response) => {

    // Object destructuring: extract the id of the selected Pokemon
    const { id } = req.params;

    // database query
    const queryString: string = `
    SELECT
        p.id,
        p.name,
        p.type_a,
        t1.weaknesses AS type_a_weaknesses,
        p.type_b,
        t2.weaknesses AS type_b_weaknesses,
        p.height,
        p.weight,
        p.category,
        p.description,
        s.hp,
        s.attack,
        s.defense,
        s.special_attack,
        s.special_defense,
        s.speed
    FROM
         pokemon p
    JOIN
        types t1 ON p.type_a = t1.type_name
    LEFT JOIN
        types t2 ON p.type_b = t2.type_name
    JOIN
        stats s ON p.stats_id = s.stats_id
    WHERE
        id = $1
    `;

    // attempt to query the database
    try {

        const result = await dbQuery(queryString, [id]);
        res.json(result.rows);

    } catch(error) {
        console.error("Error occurred while attempting to execute query: ", error);
        res.status(500).json({error: "Failed to retrieve data for selected Pokemon."});
    }
});


// export the pokedex Router to be used in our main file
export default pokedexRouter;