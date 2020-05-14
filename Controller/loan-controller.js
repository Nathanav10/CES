"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_connector_1 = require("../Connector/mongo-connector");
const exchange_service_1 = require("../Services/exchange-service");
const converter_enum_1 = require("../Conversion/converter-enum");
const loan_service_1 = require("../Services/loan-service");
const receipt_service_1 = require("../Services/receipt-service");
class LoanController {
    StartLoan(req, res) {
        let mc = new mongo_connector_1.MongoConnector();
        //TODO: export to ctor
        let loanService = new loan_service_1.LoanService(mc);
        loanService.CreateNewLoan(req).then(newLoan => {
            res.send(receipt_service_1.ReceiptService.GetNewLoanReceipt(newLoan));
        }).catch(err => {
            res.status(400).send({
                message: `Was not able to start loan`
            });
        });
    }
    EndLoan(req, res) {
        let mc = new mongo_connector_1.MongoConnector();
        let loanService = new loan_service_1.LoanService(mc);
        loanService.EndLoan(req, new exchange_service_1.ExchangeService(converter_enum_1.Converter.ExchangeRates)).then(loan => {
            res.send(receipt_service_1.ReceiptService.GetEndLoanReceipt(loan));
        }).catch(err => {
            if (err.message == "Store unauthorized to end loan") {
                return res.status(401).send(err.message);
            }
            return res.status(400).send(err.message);
        });
        // mc.GetLoan(req.body.loanId).then(loan => {
        //     if (loan.endDate) {
        //         return res.status(400).send("Loan already ended");
        //     }
        //     if (loan.clientId != req.headers.clientid) {
        //         return res.status(401).send("Store unauthorized to end loan");
        //     }
        //     let totalCommission = loan.baseCommission +
        //         moment(new Date()).diff(moment.unix(loan.startDate), "days") * loan.dailyCommission;
        //     let exchangeService = new ExchangeService(Converter.ExchangeRates);
        //     exchangeService.Exchange(loan.amount, loan.base, req.body.target).then(exchangeAmount => {
        //         let paidAmount = exchangeAmount / 100 * (100 + totalCommission);
        //         mc.UpdateEndLoan(loan._id, moment().unix()).then(success => {
        //             if (success) {
        //                 res.send(`Loan details:
        //             Paid Currency: ${req.body.target}
        //             Total commission: ${totalCommission}
        //             Paid amount before commission: ${exchangeAmount}
        //             paid amount: ${paidAmount}
        //             Laon End: ${moment().format("DD/MM/yyyy")}
        //
        //             Loan details:
        //             Loan amount: ${loan.amount}
        //             Loan currency: ${loan.base}
        //             Base commission: ${loan.baseCommission}
        //             Daily commission: ${loan.dailyCommission}
        //             Loan start: ${moment.unix(loan.startDate).format("DD/MM/yyyy")}`)
        //             } else {
        //                 res.status(400).send("Was unable to end the loan")
        //             }
        //         });
        //     });
        // });
    }
}
exports.LoanController = LoanController;
//# sourceMappingURL=loan-controller.js.map