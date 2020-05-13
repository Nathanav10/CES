import {MongoConnector} from "../Connector/mongo-connector";
import * as moment from "moment";
import * as sha1 from 'sha1';

export class LoanController {
    // TODO : reuse mc=connector
    StartLoan(req, res) {
        let mc = new MongoConnector();
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
            })
        }).catch(err => {
            res.status(400).send({
                message: `Was not able to start loan`
            })
        });
    }

    EndLoan(req, res) {
        console.log("asd");
    }
}