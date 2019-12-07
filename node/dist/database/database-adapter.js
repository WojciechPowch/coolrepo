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
        this.dbName = "cooldb";
        this.mongoClient = mongodb_1.default.MongoClient;
        if (this.db) {
            return;
        }
        this.mongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true }, (error, db) => {
            if (error) {
                logger_1.Logger.print("error occured while connecting database");
                logger_1.Logger.print(error.message);
                return;
            }
            logger_1.Logger.print("Database connected");
            this.db = db.db(this.dbName);
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DatabaseAdapter();
        }
        return this.instance;
    }
    getDB() {
        return this.db;
    }
    async insert(collection, data) {
        // @ts-ignore
        return await this.db.collection(collection).insertOne(data, (error, res) => {
            if (error) {
                return false;
            }
            logger_1.Logger.print(`Insert 1 row to collection ${collection}`);
            return true;
        });
    }
    async insertMany(collection, data) {
        // @ts-ignore
        return await this.db.collection(collection).insertMany(data, (error, res) => {
            if (error) {
                return false;
            }
            logger_1.Logger.print(`Insert ${data.length} rows to collection ${collection}`);
            return true;
        });
    }
    async getData(collection, condition) {
        return await this.db.collection(collection).find(condition).toArray();
    }
    async update(collection, condition, data) {
        return await this.db.collection(collection).updateOne(condition, { $set: data });
    }
}
exports.DatabaseAdapter = DatabaseAdapter;
DatabaseAdapter.instance = new DatabaseAdapter();
//# sourceMappingURL=database-adapter.js.map