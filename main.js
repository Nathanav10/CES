"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const loan_controller_1 = require("./Controller/loan-controller");
const exchange_controller_1 = require("./Controller/exchange-controller");
const config_conroller_1 = require("./Controller/config-conroller");
const authentication_middleware_1 = require("./middleware/authentication-middleware");
const permission_middleware_1 = require("./middleware/permission-middleware");
// import {RobController} from "./Controller/rob-controller";
let app = express();
app.use(bodyParser.json());
app.use(authentication_middleware_1.Authenticate);
app.get('/exchange', permission_middleware_1.ExchangePermissions);
app.post('/loan', permission_middleware_1.LoanPermissions);
app.post('/endLoan', permission_middleware_1.EndLoanPermissions);
// TODO: move data to different git
// TODO: add readme with all intrsuctions
let exchangeController = new exchange_controller_1.ExchangeController();
let configController = new config_conroller_1.ConfigConroller();
let loanController = new loan_controller_1.LoanController();
// let robController = new RobController();
app.get('/exchange', exchangeController.Exchange);
app.put('/config', configController.config);
app.post('/loan', loanController.StartLoan);
app.post('/endLoan', loanController.EndLoan);
// app.get('/rob', robController.Operate);
let server = app.listen(8081, () => {
    console.log('Server listening');
});
//# sourceMappingURL=main.js.map