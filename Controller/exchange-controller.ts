import {ExchangeService} from "../Services/exchange-service";
import {Converter} from "../Conversion/converter-enum";
import {MongoConnector} from "../Connector/mongo-connector";
import {ReceiptService} from "../Services/receipt-service";

export class ExchangeController {
    Exchange(req, res) {
        let exchangeService = new ExchangeService(Converter.ExchangeRates);
        let mc = new MongoConnector();
        mc.GetParamValue("baseCommission").then(commission => {
            exchangeService.Exchange(req.query.amount, req.query.base, req.query.target).then(convertedAmount => {
                res.send(ReceiptService.GetExchangeReceipt(req, commission, convertedAmount));
            });
        }).catch(err => {
            res.status(400).send({
                message: `There was en error in exchanging process: ${err.message}`
            })
        })
    }
}