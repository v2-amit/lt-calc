<template>
    <div>
        <label v-if="label">{{ label }}</label>
      <input
        ref="input"
        :value="value"
        @input="updateValue($event.target.value)"
        @focus="selectAll"
        @blur="formatValue"
      >
    </div>
</template>
<script>
    import Accounting from 'accounting'

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
        mounted () {
            this.formatValue()
        },
        methods: {
                updateValue (value) {
                this.$emit('input', Accounting.unformat(value))
            },
            formatValue () {
                this.$refs.input.value = Accounting.formatMoney(this.value, { precision: 0 })
            },
            selectAll (event) {
                // Workaround for Safari bug
                // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
                setTimeout(function () {
                    event.target.select()
                }, 0)
            }
        }
    }
</script>