"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_connector_1 = require("../Connector/mongo-connector");
const moment = require("moment");
const sha1 = require("sha1");
const exchange_operator_1 = require("../Exchange/exchange-operator");
const converter_enum_1 = require("../Conversion/converter-enum");
class LoanController {
    // TODO : reuse mc=connector
    // TODO: export receipt
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
        let mc = new mongo_connector_1.MongoConnector();
        mc.GetLoan(req.body.loanId).then(loan => {
            let totalCommission = loan.baseCommission +
                moment(new Date()).diff(moment.unix(loan.startDate), "days") * loan.dailyCommission;
            let exchangeOperator = new exchange_operator_1.ExchangeOperator(converter_enum_1.Converter.ExchangeRates);
            exchangeOperator.Exchange(loan.amount, loan.base, req.body.target).then(exchangeAmount => {
                let paidAmount = exchangeAmount / 100 * (100 + totalCommission);
                mc.UpdateEndLoan(loan._id, moment().unix()).then(success => {
                    if (success) {
                        res.send(`Loan details:
                    Paid Currency: ${req.body.target}
                    Total commission: ${totalCommission}
                    Paid amount before commission: ${exchangeAmount}
                    paid amount: ${paidAmount}
                    Laon End: ${moment().format("DD/MM/yyyy")}
                    
                    Loan details:
                    Loan amount: ${loan.amount}
                    Loan currency: ${loan.base}
                    Base commission: ${loan.baseCommission}
                    Daily commission: ${loan.dailyCommission}
                    Loan start: ${moment.unix(loan.startDate).format("DD/MM/yyyy")}`);
                    }
                    else {
                        res.status(400).send("Was unable to end the loan");
                    }
                });
            });
        });
    }
}
exports.LoanController = LoanController;
//# sourceMappingURL=loan-controller.js.map