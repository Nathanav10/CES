"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const exchange_operator_1 = require("./Exchange/exchange-operator");
const converter_enum_1 = require("./Conversion/converter-enum");
const mongo_connector_1 = require("./Connector/mongo-connector");
const bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.json());
// TODO: change to post
app.get('/exchange', (req, res) => {
    let exchangeOperator = new exchange_operator_1.ExchangeOperator(converter_enum_1.Converter.ExchangeRates);
    exchangeOperator.Exchange(req.query.amount, req.query.base, req.query.target).then(receipt => {
        res.send(receipt);
    }).catch(err => {
        res.status(400).send({
            message: `There was en error in exchanging process: ${err.message}`
        });
    });
});
app.put('/config', (req, res) => {
    res.send("Success");
    let mc = new mongo_connector_1.MongoConnector("mongodb://localhost:27017/");
    mc.ConfigParameter(req.body.param, req.body.value).then(updateSuccessful => {
        if (updateSuccessful) {
            res.send("Configured successfully");
        }
        else {
            res.status(400).send({
                message: "There was en error configuring parameter"
            });
        }
    });
    // let exchangeOperator = new ExchangeOperator(Converter.ExchangeRates);
    // exchangeOperator.Exchange(req.query.amount, req.query.base, req.query.target).then(receipt => {
    //     res.send(receipt);
    // }).catch(err => {
    //     res.status(400).send({
    //         message: `There was en error in exchanging process: ${err.message}`
    //     })
    // })
});
let server = app.listen(8081, () => {
    console.log('Server listening');
});
//# sourceMappingURL=main.js.map