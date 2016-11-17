export default {
    convertLoanTermInMonths : function (LoanTerm) {
        return LoanTerm * 12;
    },
    convertInterestRatePerMonths : function (InterestRate) {
        return InterestRate / 1200;
    },
    /*
        amount : total amount balance
        term : months (#yr*12)
        apr : rate/month (rate/12)
    */
    getPayment : function (amount, term, apr) {
        /* Calculates the monthly payment from annual percentage
        rate, term of loan in months and loan amount. **/
        var acc = 0;
        var base = 1 + apr;
        for (var i = 1; i <= term; i++)
        { acc += Math.pow(base, -i); }
        return amount / acc;
    },
    monthlyPaymentUsingLoanTermInYears : function (LoanAmount, LoanTerm, InterestRate) {
        return this.getPayment(LoanAmount, this.convertLoanTermInMonths(LoanTerm), this.convertInterestRatePerMonths(InterestRate));
    }
}