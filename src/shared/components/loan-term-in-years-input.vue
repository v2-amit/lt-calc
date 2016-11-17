<template>
    <div class="form-group">
        <label v-if="label">{{ label }}</label>
        <select
            ref="input"
            :value="value"
            @input="updateValue($event.target.value)"
            >
            <option v-for="option in LoanTermInYearsList" v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script>
    import Accounting from 'accounting'
    import { LoanTermInYearsList } from '../contants/loan-term-list'

    export default {
        props: {
            value: {
                type: Number,
                default: 0
            },
            label: {
                type: String,
                 default: ''
            }
        },
        data() {
            return {
                LoanTermInYearsList: LoanTermInYearsList
            }
        },
        methods: {
            updateValue (value) {
                this.$emit('input', Accounting.unformat(value))
            }
        }
    }
</script>