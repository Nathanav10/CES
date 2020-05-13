import * as express from "express"
import {ExchangeOperator} from "./Exchange/exchange-operator";
import {Converter} from "./Conversion/converter-enum";
import {MongoConnector} from "./Connector/mongo-connector";
import * as bodyParser from "body-parser"
import {LoanController} from "./Controller/loan-controller";
import {ExchangeController} from "./Controller/exchange-controller";
import {ConfigConroller} from "./Controller/config-conroller";

let app = express();
app.use(bodyParser.json());

// TODO: move data to different git
// TODO: change to post
// TODO: move to controllers
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