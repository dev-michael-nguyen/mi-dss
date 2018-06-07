<template>
  <div>
    <v-toolbar color="primary">
      <v-toolbar-title class="white--text">Create Profile</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="onClickedSave()">Save</v-btn>
    </v-toolbar>
    <v-card>
      <v-container>
        <v-form ref="form" v-if="model">
          <fieldset class=fieldset-one>
            <legend><h1>Personal Information</h1></legend>
            <mi-text-editor label="First Name" v-model="model.personName.firstName" required></mi-text-editor>
            <mi-text-editor label="Last Name" v-model="model.personName.lastName" required></mi-text-editor>
            <mi-birth-date-editor label="Birth Date" v-model="model.birthDate" required></mi-birth-date-editor>
          </fieldset>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: null
    }
  },
  beforeCreate (to, from, next) {
    this.$http.get('profiles/?getEmptyEntity=true')
      .then((res) => {
        this.model = res.data
      })
  },
  methods: {
    onClickedSave () {
      if (this.$refs.form.validate()) {
        this.$http.post('profiles', this.model)
          .then((res) => {
            this.$router.push({ name: 'ProfileList' })
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
