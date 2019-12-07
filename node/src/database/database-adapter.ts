import { throws } from "assert";
import mongo from "mongodb";
import { Logger } from "../util/logger";

export class DatabaseAdapter {

    public static getInstance(): DatabaseAdapter {
        if (!this.instance) {
            this.instance = new DatabaseAdapter();
        }
        return this.instance;
    }

    private static instance = new DatabaseAdapter();
    private url = "mongodb://127.0.0.1:27017/";
    private dbName = "cooldb";
    private mongoClient = mongo.MongoClient;
    private db: any;

    private constructor() {
        if (this.db) {
            return;
        }
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

    public getDB() {
        return this.db;
    }

    public async insert(collection: string, data: any): Promise<boolean> {
        // @ts-ignore
        return await this.db.collection(collection).insertOne(data, (error, res) => {
            if (error) {
                return false;
            }
            Logger.print(`Insert 1 row to collection ${collection}`);
            return true;
        });
    }

    public async insertMany(collection: string, data: any[]): Promise<boolean> {
        // @ts-ignore
        return await this.db.collection(collection).insertMany(data, (error, res) => {
            if (error) {
                return false;
            }
            Logger.print(`Insert ${data.length} rows to collection ${collection}`);
            return true;
        });
    }

    public async getData(collection: string, condition: any): Promise<any[]> {
        return await this.db.collection(collection).find(condition).toArray();
    }

    public async update(collection: string, condition: any, data: any): Promise<any> {
        return await this.db.collection(collection).updateOne(condition,
                                                                {$set : data});
    }
}
