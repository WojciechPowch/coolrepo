import express from "express";
import { ControllersInitializator } from "./controllers/controllers-initializator";
import { DatabaseAdapter } from "./database/database-adapter";
const app = express();
const port = 8080; // default port to listen
// tslint:disable-next-line
require("dotenv/config");

const controllersInitializator = new ControllersInitializator(app);
controllersInitializator.initControllers();
DatabaseAdapter.getInstance();

// define a route handler for the default home page
// @ts-ignore
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
