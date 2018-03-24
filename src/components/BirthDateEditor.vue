<template>
  <v-flex xs12 sm6>
    <v-menu lazy ref="menu"
      offset-y transition="scale-transition"
      full-width min-width="290px" nudge-right="40"
      :close-on-content-click="false"
      v-model="menu"
      :return-value="valueModel">
      <v-text-field
        slot="activator" prepend-icon="event"
        :label="label" v-model="formattedDate"
        readonly :required="required" :rules="rules">
      </v-text-field>
      <v-date-picker ref="picker" active-picker="YEAR"
        no-title scrollable
        v-model="valueModel"
        @change="save"
        :min="min" :max="max">
      </v-date-picker>
    </v-menu>
  </v-flex>
</template>

<script>
import iEditor from './mixins/iEditor'
export default {
  mixins: [iEditor],
  data () {
    return {
      menu: false,
      min: '1950-01-01',
      max: new Date().toISOString().substr(0, 10)
    }
  },
  computed: {
    formattedDate () {
      if (!this.valueModel) { return '' }
      var d = this.valueModel.split('-')
      return `${d[1]}/${d[2]}/${d[0]}`
    }
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
