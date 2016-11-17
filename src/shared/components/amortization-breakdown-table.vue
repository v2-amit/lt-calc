<template>
    <div>
        <div v-for="(yearData, year) in amortizationBreakdown">
            {{ year }}
            <ul v-for="monthData in yearData">
                <li>
                    {{ monthData.namedMonth }}
                </li>
                <li>
                    {{ monthData.payment }}
                </li>
                <li>
                    {{ monthData.principal }}
                </li>
                <li>
                    {{ monthData.interestPaid }}
                </li>
                <li>
                    {{ monthData.totalInterest }}
                </li>
                <li>
                    {{ monthData.balance }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import AmortizationBreakdownHelper from '../helpers/amortization-breakdown'
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
</script>