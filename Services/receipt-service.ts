import * as moment from "moment";

export class ReceiptService {
    static GetExchangeReceipt(req, commission: number, convertedAmount: number) {
        return `From amount: ${req.query.amount}
                    From currency: ${req.query.base}
                    To currency: ${req.query.target}
                    Commission: ${commission}%
                    Amount before commission: ${convertedAmount}
                    Amount: ${convertedAmount / 100.0 * (100 - commission)}\n`
    }

    static GetNewLoanReceipt(newLoan) {
        return `Loan details:
                    Loan amount: ${newLoan.amount}
                    Loan currency: ${newLoan.base}
                    Base commission: ${newLoan.baseCommission}
                    Daily commission: ${newLoan.dailyCommission}
                    Loan start: ${moment.unix(newLoan.startDate).format("DD/MM/yyyy")}
                    Loan Id: ${newLoan._id}`;
    }

    static GetEndLoanReceipt(loan) {
        return `Loan details:
                    Paid Currency: ${loan.target}
                    Total commission: ${loan.totalCommission}
                    Paid amount before commission: ${loan.exchangeAmount}
                    paid amount: ${loan.paidAmount}
                    Laon End: ${moment().format("DD/MM/yyyy")}
                    
                    Loan details:
                    Loan amount: ${loan.amount}
                    Loan currency: ${loan.base}
                    Base commission: ${loan.baseCommission}
                    Daily commission: ${loan.dailyCommission}
                    Loan start: ${moment.unix(loan.startDate).format("DD/MM/yyyy")}`
    }
}