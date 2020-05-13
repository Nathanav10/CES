import {MongoConnector} from "../Connector/mongo-connector";

const EXCHANGE_PERMISSION = "exchange";
const LOAN_PERMISSION = "loan";
const END_LOAN_PERMISSION = "end-loan";

function CheckPermissions(req, res, next, permission) {
    let mc = new MongoConnector();
    mc.GetClientPermission(req.headers.clientid).then(permissions => {
        if (!permissions.includes(permission)) {
            return res.sendStatus(403);
        }
        next();
    });
}

export function ExchangePermissions(req, res, next) {
    CheckPermissions(req, res, next, EXCHANGE_PERMISSION);
}


export function LoanPermissions(req, res, next) {
    CheckPermissions(req, res, next, LOAN_PERMISSION);
}

export function EndLoanPermissions(req, res, next) {
    CheckPermissions(req, res, next, END_LOAN_PERMISSION);
}
