"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exchange_service_1 = require("../Services/exchange-service");
const converter_enum_1 = require("../Conversion/converter-enum");
const mongo_connector_1 = require("../Connector/mongo-connector");
const receipt_service_1 = require("../Services/receipt-service");
class ExchangeController {
    Exchange(req, res) {
        let exchangeService = new exchange_service_1.ExchangeService(converter_enum_1.Converter.ExchangeRates);
        let mc = new mongo_connector_1.MongoConnector();
        mc.GetParamValue("baseCommission").then(commission => {
            exchangeService.Exchange(req.query.amount, req.query.base, req.query.target).then(convertedAmount => {
                res.send(receipt_service_1.ReceiptService.GetExchangeReceipt(req, commission, convertedAmount));
            });
        }).catch(err => {
            res.status(400).send({
                message: `There was en error in exchanging process: ${err.message}`
            });
        });
    }
}
exports.ExchangeController = ExchangeController;
//# sourceMappingURL=exchange-controller.js.map