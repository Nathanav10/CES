"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoConnector {
    constructor() {
        this.dbUrl = "mongodb://localhost:27017/";
    }
    UpdateParameter(param, value) {
        //TODO: close db
        return mongodb_1.MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("config");
            return dbo.collection("parameters").updateOne({ _id: param }, { $set: { value: value } }, { upsert: false }).then(res => {
                // TODO: return based on documents changed
                return true;
            }).catch(err => {
                return false;
            });
        });
    }
    UpdateEndLoan(loanId, endDate) {
        return mongodb_1.MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("loans");
            return dbo.collection("loans").updateOne({ _id: loanId }, { $set: { endDate: endDate } }, { upsert: false }).then(res => {
                return true;
            }).catch(err => {
                return false;
            });
        });
    }
    GetParamValue(param) {
        return mongodb_1.MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("config");
            return dbo.collection("parameters").findOne({ _id: param }).then(param => {
                // TODO: return based on documents changed
                return param.value;
            });
        });
    }
    InsertLoan(loan) {
        return mongodb_1.MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("loans");
            dbo.collection("loans").insertOne(loan);
        });
    }
    GetLoan(loanId) {
        return mongodb_1.MongoClient.connect(this.dbUrl).then(db => {
            let dbo = db.db("loans");
            return dbo.collection("loans").findOne({ _id: loanId }).then(loan => {
                return loan;
            });
        });
    }
}
exports.MongoConnector = MongoConnector;
//# sourceMappingURL=mongo-connector.js.map