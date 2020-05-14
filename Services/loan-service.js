"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const sha1 = require("sha1");
class LoanService {
    constructor(mc) {
        this.mc = mc;
    }
    CreateNewLoan(req) {
        return this.mc.GetParamValue("baseCommission").then(baseCommission => {
            let newLoan = {
                _id: sha1(moment().unix()),
                amount: req.body.amount,
                base: req.body.base,
                // can be added to configurable parameters to be fetched
                dailyCommission: 0.5,
                baseCommission: baseCommission,
                startDate: moment().unix(),
                clientId: req.headers.clientid
            };
            return this.mc.InsertLoan(newLoan).then(doc => {
                return newLoan;
            });
        });
    }
    EndLoan(req, exchangeService) {
        return this.mc.GetLoan(req.body.loanId).then(loan => {
            if (loan.endDate) {
                throw new Error("Loan already ended");
                // return res.status(400).send("Loan already ended");
            }
            if (loan.clientId != req.headers.clientid) {
                throw new Error("Store unauthorized to end loan");
                // return res.status(401).send("Store unauthorized to end loan");
            }
            let totalCommission = loan.baseCommission +
                moment(new Date()).diff(moment.unix(loan.startDate), "days") * loan.dailyCommission;
            return exchangeService.Exchange(loan.amount, loan.base, req.body.target).then(exchangeAmount => {
                let paidAmount = exchangeAmount / 100 * (100 + totalCommission);
                return this.mc.UpdateEndLoan(loan._id, moment().unix()).then(success => {
                    loan.target = req.body.target;
                    loan.totalComission = totalCommission;
                    loan.exchangeAmount = exchangeAmount;
                    loan.paidAmount = paidAmount;
                    if (success) {
                        return loan;
                    }
                    else {
                        throw new Error("Was unable to end the loan");
                        // res.status(400).send("Was unable to end the loan")
                    }
                });
            });
        });
    }
}
exports.LoanService = LoanService;
//# sourceMappingURL=loan-service.js.map