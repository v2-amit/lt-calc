<template>
  <div class="container calc-section">
    <div class="row">
      <div class="col-xs-12 col-sm-5 col-md-4 col-lg-4">
        <div class="calc-inputs padding40 lightestgray mb-lg">
          <form>
            <h4 class="text-capitalize">Monthly Loan Cost</h4>
            <number-input label="Loan Amount:" v-model="LoanAmount"></number-input>
            <number-input label="Interest Rate:" v-model="InterestRate" symbol="%" symbolaligned="right" precision="3"></number-input>
            <loan-term-in-years-input label="Loan Term:" v-model="LoanTermInYears"></loan-term-in-years-input>
          </form>
          <a class="btn btn-blue btn-arrow btn-block btn-calc">Calculate</a>
        </div>
      </div>
      <div class="col-xs-12 col-sm-7 col-md-push-0 col-md-8 col-lg-7 col-lg-push-1 text-center calculate-amount-section">
        <h3>Your monthly payment will be:</h3>
        <span class="calculate-amount">{{ MonthlyPayment  }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <amortization-breakdown-table v-bind:loan-amount="LoanAmount" v-bind:loan-term-in-years="LoanTermInYears" v-bind:interest-rate="InterestRate"></amortization-breakdown-table>
      </div>
    </div>
  </div>
</template>

<script>
    import NumberInput from '../shared/components/number-input.vue'
    import AmortizationBreakdownTable from '../shared/components/amortization-breakdown-table.vue'
    import LoanTermInYearsInput from '../shared/components/loan-term-in-years-input.vue'
    import Accounting from 'accounting'
    import PaymentHelper from '../shared/helpers/payment'

    import style from '../shared/css/common.scss'

    export default {
        data () {
            return {
                LoanAmount: 50000,
                InterestRate: 2.0,
                LoanTermInYears: 30,
                MonthlyPayment: 0
            }
        },
        computed: {
            MonthlyPayment : function () {
                    return Accounting.formatMoney(PaymentHelper.monthlyPaymentUsingLoanTermInYears(this.LoanAmount, this.LoanTermInYears, this.InterestRate), { precision: 2 });
            }
        },
        components: {
            NumberInput,
            LoanTermInYearsInput,
            AmortizationBreakdownTable
        }
    }
</script>