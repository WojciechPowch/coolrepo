import mongo from "mongodb";
import { Logger } from "../util/logger";

export class DatabaseAdapter {

    public static getInstance(): DatabaseAdapter {
        return this.instance;
    }

    private static instance = new DatabaseAdapter();
    private url = "mongodb://127.0.0.1:27017/";
    private dbName = "cooldb";
    private mongoClient = mongo.MongoClient;
    private db: any;

    private constructor() {
        this.mongoClient.connect(this.url, {useUnifiedTopology: true, useNewUrlParser: true}, (error, db) => {
            if (error) {
                Logger.print("error occured while connecting database");
                Logger.print(error.message);
                return;
            }
            Logger.print("Database connected");
            this.db = db.db(this.dbName);
        });
    }

    public insert(collection: string, data: any): void {
        // @ts-ignore
        this.db.collection(collection).insertOne(data, (error, res) => {
            if (error) {
                throw error;
            }
            Logger.print(`Insert 1 row to collection ${collection}`);
        })
    }

    public insertMany(collection: string, data: Array<any>): void {
        // @ts-ignore
        this.db.collection(collection).insertMany(data, (error, res) => {
            if (error) {
                throw error;
            }
            Logger.print(`Insert ${data.length} rows to collection ${collection}`);
        })
    }

    public getData(collection: string, query: any, callback: Function): void {
        this.db.collection(collection).find(query).toArray(callback)
    }
}
