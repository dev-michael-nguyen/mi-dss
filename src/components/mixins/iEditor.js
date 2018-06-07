export default {
  props: {
    label: { type: String },
    value: { type: String }, // This will bind to v-model which normally should be a string
    readonly: { type: Boolean },
    required: { type: Boolean }
  },
  data () {
    return {
      // WARNING: Vue doesn't allow direct mutation on prop if it is not an object since it is anti-pattern.
      //          This mean we shouldn't bind v-model="value" and instead use v-model="valueModel".
      // NOTE: There is an exception if prop is an object where child can use v-model="valueModel.nestedProperty"
      //       which will flow back to parent by default
      valueModel: this.value,
      // validation rules
      requiredRule: v => !!v || 'This is required'
    }
  },
  computed: {
    rules () {
      return this.required ? [this.requiredRule] : []
    }
  },
  watch: {
    // Allow child to react if value was changed in parent since we are keeping a local copy
    value (val) {
      this.valueModel = val
    },
    // NOTE: Bypass VueJs default behavior by allow change in value prop from children
    //       to propogate to parent even for non-object props. See valueModel above.
    valueModel (val) {
      this.$emit('input', this.valueModel)
    }
  }
}
