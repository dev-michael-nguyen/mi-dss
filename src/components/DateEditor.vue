<template>
  <v-flex xs12 sm6>
    <v-menu lazy
      offset-y transition="scale-transition"
      full-width min-width="290px" nudge-right="40"
      :return-value="valueModel">
      <v-text-field
        slot="activator" prepend-icon="event"
        :label="label" v-model="formattedDate"
        readonly :required="required" :rules="rules">
      </v-text-field>
      <v-date-picker
        no-title scrollable
        v-model="valueModel">
      </v-date-picker>
    </v-menu>
  </v-flex>
</template>

<script>
import iEditor from './mixins/iEditor'
export default {
  mixins: [iEditor],
  computed: {
    formattedDate () {
      if (!this.valueModel) { return '' }
      var d = this.valueModel.split('-')
      return `${d[1]}/${d[2]}/${d[0]}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
