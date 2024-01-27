// import the Express module into the file
import express, { Express, Request, Response } from "express";

// create a web server
const app: Express = express();
const PORT: (string | number) = process.env.PORT || 5000;


// set server to listen for requests on specified port
app.listen(PORT, () => {

    console.log(`Server now up and running on PORT ${PORT}`);
});

// initial route for start-up
app.get("/", (req: Request, res: Response) => {

    res.send("Hello World!");
});

