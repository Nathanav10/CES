import {MongoConnector} from "../Connector/mongo-connector";
import * as moment from "moment";
import {ExchangeService} from "../Services/exchange-service";
import {Converter} from "../Conversion/converter-enum";
import {LoanService} from "../Services/loan-service";
import {ReceiptService} from "../Services/receipt-service";

export class LoanController {
    StartLoan(req, res) {
        let mc = new MongoConnector();
        let loanService: LoanService = new LoanService(mc);
        loanService.CreateNewLoan(req).then(newLoan => {
            res.send(ReceiptService.GetNewLoanReceipt(newLoan));
        }).catch(err => {
            res.status(400).send({
                message: `Was not able to start loan`
            })
        });
    }

    EndLoan(req, res) {
        let mc = new MongoConnector();
        let loanService = new LoanService(mc);
        loanService.EndLoan(req, new ExchangeService(Converter.ExchangeRates)).then(loan => {
            res.send(ReceiptService.GetEndLoanReceipt(loan));
        }).catch(err => {
            if (err.message == "Store unauthorized to end loan") {
                return res.status(401).send(err.message);
            }
            return res.status(400).send(err.message);
        });
    }
}