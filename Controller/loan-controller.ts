import {MongoConnector} from "../Connector/mongo-connector";
import * as moment from "moment";
import * as sha1 from 'sha1';
import {ExchangeOperator} from "../Exchange/exchange-operator";
import {Converter} from "../Conversion/converter-enum";

export class LoanController {
    // TODO: export receipt
    StartLoan(req, res) {
        let mc = new MongoConnector();
        mc.GetParamValue("baseCommission").then(baseCommission => {
            let newLoan = {
                _id: sha1(moment().unix()),
                amount: req.body.amount,
                base: req.body.base,
                // can be added to configurable parameters to be fetched
                dailyCommission: 0.5,
                baseCommission: baseCommission,
                startDate: moment().unix(),
                clientId: req.headers.clientid
            };
            mc.InsertLoan(newLoan).then(doc => {
                let receipt = `Loan details:
                    Loan amount: ${newLoan.amount}
                    Loan currency: ${newLoan.base}
                    Base commission: ${newLoan.baseCommission}
                    Daily commission: ${newLoan.dailyCommission}
                    Loan start: ${moment.unix(newLoan.startDate).format("DD/MM/yyyy")}
                    Loan Id: ${newLoan._id}`;
                res.send(receipt);
            })
        }).catch(err => {
            res.status(400).send({
                message: `Was not able to start loan`
            })
        });
    }

    EndLoan(req, res) {
        let mc = new MongoConnector();
        mc.GetLoan(req.body.loanId).then(loan => {
            if (loan.endDate) {
                return res.status(400).send("Loan already ended");
            }
            if (loan.clientId != req.headers.clientid) {
                return res.status(401).send("Store unauthorized to end loan");
            }
            let totalCommission = loan.baseCommission +
                moment(new Date()).diff(moment.unix(loan.startDate), "days") * loan.dailyCommission;
            let exchangeOperator = new ExchangeOperator(Converter.ExchangeRates);
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
                    Loan start: ${moment.unix(loan.startDate).format("DD/MM/yyyy")}`)
                    } else {
                        res.status(400).send("Was unable to end the loan")
                    }
                });
            });
        });
    }
}