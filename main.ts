import * as express from "express"
import * as bodyParser from "body-parser"
import {LoanController} from "./Controller/loan-controller";
import {ExchangeController} from "./Controller/exchange-controller";
import {ConfigConroller} from "./Controller/config-conroller";
import {Authenticate} from "./middleware/authentication-middleware";
import {
    EndLoanPermissions,
    ExchangePermissions,
    LoanPermissions
} from "./middleware/permission-middleware";

let app = express();

app.use(bodyParser.json());
app.use(Authenticate);
app.get('/exchange', ExchangePermissions);
app.post('/loan', LoanPermissions);
app.post('/endLoan', EndLoanPermissions);

let exchangeController = new ExchangeController();
let configController = new ConfigConroller();
let loanController = new LoanController();

app.get('/exchange', exchangeController.Exchange);

app.put('/config', configController.config);

app.post('/loan', loanController.StartLoan);

app.post('/endLoan', loanController.EndLoan);


let server = app.listen(8081, () => {
    console.log('Server listening');
});