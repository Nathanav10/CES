import {ExchangeOperator} from "../Exchange/exchange-operator";
import {Converter} from "../Conversion/converter-enum";
import {MongoConnector} from "../Connector/mongo-connector";

export class ExchangeController {
    Exchange(req, res) {
        let exchangeOperator = new ExchangeOperator(Converter.ExchangeRates);
        let mc = new MongoConnector();
        mc.GetParamValue("baseCommission").then(commission => {
            exchangeOperator.Exchange(req.query.amount, req.query.base, req.query.target).then(convertedAmount => {

                res.send(`From amount: ${req.query.amount}
From currency: ${req.query.base}
To currency: ${req.query.target}
Commission: ${commission}%
Amount before commission: ${convertedAmount}
Amount: ${convertedAmount / 100.0 * (100 - commission)}\n`)
            });
        }).catch(err => {
            res.status(400).send({
                message: `There was en error in exchanging process: ${err.message}`
            })
        })
    }
}