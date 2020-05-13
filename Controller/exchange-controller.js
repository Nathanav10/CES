"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exchange_operator_1 = require("../Exchange/exchange-operator");
const converter_enum_1 = require("../Conversion/converter-enum");
const mongo_connector_1 = require("../Connector/mongo-connector");
class ExchangeController {
    Exchange(req, res) {
        let exchangeOperator = new exchange_operator_1.ExchangeOperator(converter_enum_1.Converter.ExchangeRates);
        let mc = new mongo_connector_1.MongoConnector();
        mc.GetParamValue("baseCommission").then(commission => {
            exchangeOperator.Exchange(req.query.amount, req.query.base, req.query.target).then(convertedAmount => {
                res.send(`From amount: ${req.query.amount}
From currency: ${req.query.base}
To currency: ${req.query.target}
Commission: ${commission}%
Amount before commission: ${convertedAmount}
Amount: ${convertedAmount / 100.0 * (100 - commission)}\n`);
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