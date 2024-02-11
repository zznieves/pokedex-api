// import the Express module into the file
import express, { Express, Request, Response } from "express";
import pokedexRouter from "./pokedex";
import dbQuery from "./db";

// create a web server
const app: Express = express();
const PORT: (string | number) = process.env.PORT || 5000;


// set server to listen for requests on specified port
app.listen(PORT, () => {

    console.log(`Server now up and running on PORT: ${PORT}`);
});


// tell our express server to use the pokedexRouter for path's matching '/pokedex'
app.use('/pokedex', pokedexRouter);
