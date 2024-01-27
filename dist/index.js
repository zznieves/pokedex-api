"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import the Express module into the file
const express_1 = __importDefault(require("express"));
// create a web server
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// set server to listen for requests on specified port
app.listen(PORT, () => {
    console.log(`Server now up and running on PORT ${PORT}`);
});
// initial route for start-up
app.get("/", (req, res) => {
    res.send("HELLO FROM EXPRESS with TypeScript!!!");
});
app.get("/hi", (req, res) => {
    res.send("HIIIIII");
});
