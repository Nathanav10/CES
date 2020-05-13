"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoConnector {
    constructor(dbUrl) {
        this.dbUrl = dbUrl;
    }
    ConfigParameter(param, value) {
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
}
exports.MongoConnector = MongoConnector;
//# sourceMappingURL=mongo-connector.js.map