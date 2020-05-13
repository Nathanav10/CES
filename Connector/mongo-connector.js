"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoConnector {
    constructor() {
        this.dbUrl = "mongodb://localhost:27017/";
    }
    ConfigParameter(param, value) {
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
    // TODO: export receit, use only connection data
    //     StartLoan(amount: number, base: string,): Promise<string> {
    //         return MongoClient.connect(this.dbUrl).then(db => {
    //             let configDbo = db.db("config");
    //             return configDbo.collection("parameters").findOne({_id: "baseCommission"}).then(doc => {
    //                 return doc.value;
    //             }).then(baseCommissionValue => {
    //                 let loansDbo = db.db("loans");
    //                 let newLoan = {
    //                     amount: amount,
    //                     base: base,
    //                     // can be added to configurable parameters to be fetched
    //                     dailyCommission: 0.5,
    //                     baseCommission: baseCommissionValue,
    //                     startDate: moment().unix(),
    //                     _id: sha1(moment().unix())
    //                 };
    //                 return loansDbo.collection("loans").insertOne(newLoan).then(doc => {
    //                     // TODO: change date format
    //                     let receipt = `Loan details:
    // Loan amount: ${amount}
    // Loan currency: ${base}
    // Base commission: ${newLoan.baseCommission}
    // Daily commission: ${newLoan.dailyCommission}
    // Loan start: ${moment.unix(newLoan.startDate).format("DD/MM/yyyy")}`;
    //                     return receipt;
    //                 });
    //
    //             });
    //         });
    //     }
    EndLoan(loanId, targetCurrency) {
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