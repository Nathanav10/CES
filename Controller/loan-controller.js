"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_connector_1 = require("../Connector/mongo-connector");
const moment = require("moment");
const sha1 = require("sha1");
class LoanController {
    // TODO : reuse mc=connector
    StartLoan(req, res) {
        let mc = new mongo_connector_1.MongoConnector();
        mc.GetParamValue("baseCommission").then(baseCommission => {
            let newLoan = {
                amount: req.body.amount,
                base: req.body.base,
                // can be added to configurable parameters to be fetched
                dailyCommission: 0.5,
                baseCommission: baseCommission,
                startDate: moment().unix(),
                _id: sha1(moment().unix())
            };
            mc.InsertLoan(newLoan).then(doc => {
                let receipt = `Loan details:
Loan amount: ${newLoan.amount}
Loan currency: ${newLoan.base}
Base commission: ${newLoan.baseCommission}
Daily commission: ${newLoan.dailyCommission}
Loan start: ${moment.unix(newLoan.startDate).format("DD/MM/yyyy")}`;
                res.send(receipt);
            });
        }).catch(err => {
            res.status(400).send({
                message: `Was not able to start loan`
            });
        });
    }
    EndLoan(req, res) {
        console.log("asd");
    }
}
exports.LoanController = LoanController;
//# sourceMappingURL=loan-controller.js.map