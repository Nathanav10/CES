"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongo_connector_1 = require("./Connector/mongo-connector");
const bodyParser = require("body-parser");
const loan_controller_1 = require("./Controller/loan-controller");
const exchange_controller_1 = require("./Controller/exchange-controller");
let app = express();
app.use(bodyParser.json());
// TODO: move data to different git
// TODO: change to post
// TODO: move to controllers
let exchangeController = new exchange_controller_1.ExchangeController();
app.get('/exchange', exchangeController.Exchange);
app.put('/config', (req, res) => {
    let mc = new mongo_connector_1.MongoConnector();
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
});
let loanController = new loan_controller_1.LoanController();
app.post('/loan', loanController.StartLoan);
app.post('/endLoan', loanController.EndLoan);
let server = app.listen(8081, () => {
    console.log('Server listening');
});
//# sourceMappingURL=main.js.map