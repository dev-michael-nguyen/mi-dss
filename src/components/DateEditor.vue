<template>
  <v-flex xs12 sm6>
    <v-menu lazy
      offset-y transition="scale-transition"
      full-width min-width="290px" nudge-right="40"
      :return-value="valueModel">
      <v-text-field :label="label" v-model="valueModel" readonly
        :required="required" :rules="rules"
        slot="activator" prepend-icon="event">
      </v-text-field>
      <v-date-picker v-model="valueModel" no-title scrollable></v-date-picker>
    </v-menu>
  </v-flex>
</template>

<script>
import iEditor from '@/mixins/iEditor'
export default {
  mixins: [iEditor]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
