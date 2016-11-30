<template>
  <div>
    <h2>
      Your <strong>monthly payments</strong> broken down
    </h2>
    <ul class="monthly-payments-table">
      <li v-for="(yearData, year) in amortizationBreakdown">
        <div class="trigger">
          <span class="glyphicon glyphicon-plus-sign"></span> {{ year }}
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-hover table-condensed">
            <thead>
              <tr>
                <th width="17%">Month</th>
                <th width="17%">Payment</th>
                <th width="16%">Principal</th>
                <th width="17%">Interest Paid</th>
                <th width="17%">Total Interest</th>
                <th width="16%">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="monthData in yearData">
                <td>{{ monthData.namedMonth }}</td>
                <td>{{ monthData.payment }}</td>
                <td>{{ monthData.principal }}</td>
                <td>{{ monthData.interestPaid }}</td>
                <td>{{ monthData.totalInterest }}</td>
                <td>{{ monthData.balance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
    import AmortizationBreakdownHelper from '../helpers/amortization-breakdown'
    import calcTable from '../css/amortization-breakdown-table.scss'

    export default {
        props: {
            loanAmount: {
                default: 0
            },
            loanTermInYears: {
                default: 0
            },
            interestRate: {
                default: 0
            },
        },
        computed: {
            amortizationBreakdown: function () {
                    return AmortizationBreakdownHelper.amortizationBreakdown(this.loanAmount, this.loanTermInYears, this.interestRate);
            }
        }
    }
    window.onload = function() {
      var accordion = document.getElementsByClassName("trigger");
      var accordionTable;
      for (accordionTable = 0; accordionTable < accordion.length; accordionTable++) {
        accordion[accordionTable].onclick = function () {
          this.classList.toggle("active");
          this.nextElementSibling.classList.toggle("active");
        }
      }
    };
</script>