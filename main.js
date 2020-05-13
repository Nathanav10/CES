"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const loan_controller_1 = require("./Controller/loan-controller");
const exchange_controller_1 = require("./Controller/exchange-controller");
const config_conroller_1 = require("./Controller/config-conroller");
let app = express();
app.use(bodyParser.json());
// TODO: move data to different git
// TODO: change to post
// TODO: move to controllers
let exchangeController = new exchange_controller_1.ExchangeController();
let configController = new config_conroller_1.ConfigConroller();
let loanController = new loan_controller_1.LoanController();
app.get('/exchange', exchangeController.Exchange);
app.put('/config', configController.config);
app.post('/loan', loanController.StartLoan);
app.post('/endLoan', loanController.EndLoan);
let server = app.listen(8081, () => {
    console.log('Server listening');
});
//# sourceMappingURL=main.js.map