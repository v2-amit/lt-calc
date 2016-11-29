<template>
    <div class="form-group">
      <label v-if="label">
        {{ label }} <a href="#" class="glyphicon glyphicon-question-sign calc-question"></a>
      </label>
      <div class="input-group">
          <span v-once v-if="alignLeft" class="input-group-addon">{{ symbol }}</span>
          <input
              class="form-control"
              type="text"
              ref="input"
              :value="value"
              @input="updateValue($event.target.value)"
              @focus="selectAll"
              @blur="formatValue"
              >
          <span v-once v-if="alignRight" class="input-group-addon">{{ symbol }}</span>
      </div>
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
            },
            symbol: {
                type: String,
                default: '$'
            },
            symbolAligned: {
                type: String,
                default: 'left'
            },
            precision: {
                default: 0
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
                this.$refs.input.value = Accounting.formatMoney(this.value, { symbol: "", precision: this.precision })
            },
            selectAll (event) {
                // Workaround for Safari bug
                // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
                setTimeout(function () {
                    event.target.select()
                }, 0)
            }
        },
        computed: {
            alignLeft: function () {
              return this.symbolAligned == "left";
            },
            alignRight: function () {
              return this.symbolAligned == "right";
            }
        }
    }
</script>