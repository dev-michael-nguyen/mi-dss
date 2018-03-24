<template>
  <v-flex xs12 sm6>
    <v-text-field
      :label="label" v-model="valueModel"
      :readonly="readonly" :required="required" :rules="rules">
    </v-text-field>
  </v-flex>
</template>

<script>
import iEditor from './mixins/iEditor'
export default {
  mixins: [iEditor]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
