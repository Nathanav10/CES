import * as express from "express"
import * as bodyParser from "body-parser"
import {LoanController} from "./Controller/loan-controller";
import {ExchangeController} from "./Controller/exchange-controller";
import {ConfigConroller} from "./Controller/config-conroller";
import {Authenticate} from "./middleware/authentication-middleware";
import {EndLoanPermissions, ExchangePermissions, LoanPermissions} from "./middleware/permission-middleware";
// import {RobController} from "./Controller/rob-controller";

let app = express();

app.use(bodyParser.json());
app.use(Authenticate);
app.get('/exchange', ExchangePermissions);
app.post('/loan', LoanPermissions);
app.post('/endLoan', EndLoanPermissions);

// TODO: move data to different git
// TODO: add readme with all intrsuctions
let exchangeController = new ExchangeController();
let configController = new ConfigConroller();
let loanController = new LoanController();
// let robController = new RobController();
// TODO: add stire header to rob
app.get('/exchange', exchangeController.Exchange);

app.put('/config', configController.config);

app.post('/loan', loanController.StartLoan);

app.post('/endLoan', loanController.EndLoan);

// app.get('/rob', robController.Operate);


let server = app.listen(8081, () => {
    console.log('Server listening');
});