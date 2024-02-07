// import the Express module into the file
import express, { Express, Request, Response } from "express";
import dbQuery from "./db";

// create a web server
const app: Express = express();
const PORT: (string | number) = process.env.PORT || 5000;


// set server to listen for requests on specified port
app.listen(PORT, () => {

    console.log(`Server now up and running on PORT: ${PORT}`);
});


// get names and types for all Pokemon
app.get('/pokedex', async (req: Request, res: Response) => {

    // attempt to query the database
    try {
        const result = await dbQuery("SELECT id, name, type_a, type_b FROM pokemon", []);
        res.json(result.rows);

    } catch (error) {

        console.error("Error occurred while attempting to execute query: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// initial route for start-up
app.get("/", (req: Request, res: Response) => {

    res.send("Hello World!");
});

