import {MongoClient} from 'mongodb';

export class MongoConnector implements DbConnector {
    dbUrl: string;

    constructor(dbUrl: string) {
        this.dbUrl = dbUrl;
    }

    ConfigParameter(param: string, value: any): Promise<boolean> {
        return MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("config");
            return dbo.collection("parameters").updateOne({_id: param}, {$set: {value: value}}, {upsert: false}).then(res => {
                // TODO: return based on documents changed
                return true;
            }).catch(err => {
                return false;
            });
        });
    }
}