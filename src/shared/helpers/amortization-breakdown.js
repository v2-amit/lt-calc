import PaymentHelper from './payment'

var getAmortizations = function (amount, term, apr, extraPayment) {
    var monthArray = new Array ("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    extraPayment = extraPayment || 0;
    var payment = PaymentHelper.getPayment(amount, term, apr);
    payment = Math.round(payment * 100) / 100;
    var balance = amount;
    var interest = 0.0;
    var principal = 0.0;
    var totalinterest = 0.0;
    var d = new Date();

    var month = d.getMonth();
    var year = d.getFullYear();
    var amortizationsByYear = {};

    for (var i = 1; i <= term; i++) {
        interest = balance * apr;
        totalinterest += interest;

        if ((payment + extraPayment) > balance) {
            if (payment > balance) {
                            extraPayment = 0;
                            payment = balance;
            } else {
                            extraPayment = balance - payment;
            }
        }
        principal = payment + extraPayment - interest;
        balance -= principal;

        if (Math.round(balance - interest) == 0) { balance = 0; }

        if (typeof amortizationsByYear[year] == "undefined") {
            amortizationsByYear[year] = new Array();
        }
        amortizationsByYear[year].push({
            monthYear: monthArray[(++month) % 12] + '/' + year,
            namedMonth: monthArray[(month) % 12],
            month: month % 12,
            year: year,
            payment: payment,
            extraPayment: extraPayment,
            principal: Math.round((principal) * 100) / 100,
            interestPaid: Math.round(interest * 100) / 100,
            totalInterest: Math.round(totalinterest * 100) / 100,
            balance: (balance < 0) ? 0 : Math.round(balance * 100) / 100
        });
        if (balance === 0) { break; }


        if ((month % 12) == 11) { year++ }
    }
    return amortizationsByYear;
};

export default {
    amortizationBreakdown : function (LoanAmount, LoanTerm, InterestRate) {
        return getAmortizations(LoanAmount, PaymentHelper.convertLoanTermInMonths(LoanTerm), PaymentHelper.convertInterestRatePerMonths(InterestRate), 0, 1);
    }
}