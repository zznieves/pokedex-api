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
// create a web server
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// set server to listen for requests on specified port
app.listen(PORT, () => {
    console.log(`Server now up and running on PORT: ${PORT}`);
});
// get names and types for all Pokemon
app.get('/pokedex', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// initial route for start-up
app.get("/", (req, res) => {
    res.send("Hello World!");
});
