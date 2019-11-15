"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = __importDefault(require("mongodb"));
const logger_1 = require("../util/logger");
class DatabaseAdapter {
    constructor() {
        this.url = "mongodb://127.0.0.1:27017/";
        this.mongoClient = mongodb_1.default.MongoClient;
        this.mongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true }, (error, db) => {
            if (error) {
                logger_1.Logger.print("error occured while connecting/creating database");
                logger_1.Logger.print(error.message);
                return;
            }
            logger_1.Logger.print("Database created/connected");
            this.db = db.db("cooldb");
        });
    }
    static getInstance() {
        return this.instance;
    }
    createCollection(name = "adminUsers") {
        // @ts-ignore
        this.db.createCollection(name, (error, res) => {
            logger_1.Logger.print(`Collection ${name} created`);
        });
    }
}
exports.DatabaseAdapter = DatabaseAdapter;
DatabaseAdapter.instance = new DatabaseAdapter();
//# sourceMappingURL=database-adapter.js.map