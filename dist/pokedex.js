"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import the Express module into the file
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
// create a router for requests using the '/pokedex' path
const pokedexRouter = express_1.default.Router();
// GET: route for initial pokedex render (basic data)
pokedexRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // attempt to query the database
    try {
        const result = yield (0, db_1.default)("SELECT id, name, type_a, type_b FROM pokemon", []);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error occurred while attempting to execute query: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
/**
 * GET: route for searching through name, type_a, and type_b for a match with
 *  given substring
 */
pokedexRouter.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // we are expecting a search string to be included with this request
    const searchString = req.query.searchString;
    console.log("Search String: ", searchString);
    const queryString = `
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
        const result = yield (0, db_1.default)(queryString, [`%${searchString}%`]);
        console.log(result.rows);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error occurred while attempting to execute query: ", error);
        res.status(500).json({ error: "Search attempt failed." });
    }
}));
/**
 * GET: route for requesting all data for selected pokemon
 */
pokedexRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Object destructuring: extract the id of the selected Pokemon
    const { id } = req.params;
    // database query
    const queryString = `
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
        const result = yield (0, db_1.default)(queryString, [id]);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error occurred while attempting to execute query: ", error);
        res.status(500).json({ error: "Failed to retrieve data for selected Pokemon." });
    }
}));
// export the pokedex Router to be used in our main file
exports.default = pokedexRouter;
