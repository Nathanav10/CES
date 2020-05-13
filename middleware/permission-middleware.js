"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_connector_1 = require("../Connector/mongo-connector");
const EXCHANGE_PERMISSION = "exchange";
const LOAN_PERMISSION = "loan";
const END_LOAN_PERMISSION = "end-loan";
function CheckPermissions(req, res, next, permission) {
    let mc = new mongo_connector_1.MongoConnector();
    mc.GetClientPermission(req.headers.clientid).then(permissions => {
        if (!permissions.includes(permission)) {
            return res.sendStatus(403);
        }
        next();
    });
}
function ExchangePermissions(req, res, next) {
    CheckPermissions(req, res, next, EXCHANGE_PERMISSION);
}
exports.ExchangePermissions = ExchangePermissions;
function LoanPermissions(req, res, next) {
    CheckPermissions(req, res, next, LOAN_PERMISSION);
}
exports.LoanPermissions = LoanPermissions;
function EndLoanPermissions(req, res, next) {
    CheckPermissions(req, res, next, END_LOAN_PERMISSION);
}
exports.EndLoanPermissions = EndLoanPermissions;
//# sourceMappingURL=permission-middleware.js.map