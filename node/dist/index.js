"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_initializator_1 = require("./controllers/controllers-initializator");
const database_adapter_1 = require("./database/database-adapter");
const app = express_1.default();
const port = 8080; // default port to listen
// tslint:disable-next-line
require("dotenv/config");
const controllersInitializator = new controllers_initializator_1.ControllersInitializator(app);
controllersInitializator.initControllers();
database_adapter_1.DatabaseAdapter.getInstance();
// define a route handler for the default home page
// @ts-ignore
app.get("/", (req, res) => {
    res.send("Hello world!");
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map