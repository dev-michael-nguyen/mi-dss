<template>
  <div>
    <v-toolbar color="primary">
      <v-toolbar-title class="white--text">Profile List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="onClickedCreate()">Create</v-btn>
    </v-toolbar>
    <v-card>
      <v-data-table
        :items="items"
        :total-items="totalItems"
        :pagination.sync="pagination"
        :search="search"
        :loading="loading"
        :headers="headers">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.personName.firstName }}</td>
          <td>{{ props.item.personName.lastName }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import iDataTable from '../../common/mixins/iDataTable'
export default {
  mixins: [iDataTable],
  data () {
    return {
      apiRoute: 'profiles',
      headers: [
        { text: 'Id', value: 'id', align: 'left' },
        { text: 'First Name', value: 'personName.firstName', align: 'left' },
        { text: 'Last Name', value: 'personName.lastName', align: 'left' }
      ]
    }
  },
  methods: {
    onClickedCreate () {
      this.$router.push({ name: 'ProfileCreate' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
