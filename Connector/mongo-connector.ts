import {MongoClient} from 'mongodb';
import * as moment from "moment";

export class MongoConnector implements DbConnector {
    dbUrl: string = "mongodb://localhost:27017/";

    UpdateParameter(param: string, value: any): Promise<boolean> {
        //TODO: close db
        return MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("config");
            return dbo.collection("parameters").updateOne({_id: param}, {$set: {value: value}}, {upsert: false}).then(res => {
                if (res.result.n == 0) {
                    return false;
                }
                return true;
            }).catch(err => {
                return false;
            });
        });
    }

    UpdateEndLoan(loanId: string, endDate: number): Promise<boolean> {
        return MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("loans");
            return dbo.collection("loans").updateOne({_id: loanId}, {$set: {endDate: endDate}}, {upsert: false}).then(res => {
                return true;
            }).catch(err => {
                return false;
            });
        });
    }

    GetParamValue(param: string): Promise<any> {
        return MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("config");
            return dbo.collection("parameters").findOne({_id: param}).then(param => {
                return param.value;
            });
        });
    }

    InsertLoan(loan) {
        return MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("loans");
            return dbo.collection("loans").insertOne(loan)
        });
    }

    GetLoan(loanId: string): Promise<any> {
        return MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("loans");
            return dbo.collection("loans").findOne({_id: loanId}).then(loan => {
                return loan;
            });
        });
    }

    GetClientPermission(clientId: string): Promise<string[]> {
        return MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("permissions");
            return dbo.collection("stores").findOne({_id: clientId}).then(stores => {
                return stores.permissions;
            });
        });
    }
}