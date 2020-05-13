import * as express from "express"
import {ExchangeOperator} from "./Exchange/exchange-operator";
import {Converter} from "./Conversion/converter-enum";
import {MongoConnector} from "./Connector/mongo-connector";
import * as bodyParser from "body-parser"

let app = express();
app.use(bodyParser.json());

// TODO: move data to differnet git
// TODO: change to post
app.get('/exchange', (req, res) => {
    let exchangeOperator = new ExchangeOperator(Converter.ExchangeRates);
    exchangeOperator.Exchange(req.query.amount, req.query.base, req.query.target).then(receipt => {
        res.send(receipt);
    }).catch(err => {
        res.status(400).send({
            message: `There was en error in exchanging process: ${err.message}`
        })
    })
});

app.put('/config', (req, res) => {
    res.send("Success");
    let mc = new MongoConnector("mongodb://localhost:27017/");
    mc.ConfigParameter(req.body.param, req.body.value).then(updateSuccessful => {
        if (updateSuccessful) {
            res.send("Configured successfully")
        } else {
            res.status(400).send({
                message: "There was en error configuring parameter"
            })
        }
    });
});

let server = app.listen(8081, () => {
    console.log('Server listening');
});