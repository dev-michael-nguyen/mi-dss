<template>
  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title class="white--text">Profile List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn>
        Create New
      </v-btn>
    </v-toolbar>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="profiles"
        :search="search"
        :pagination.sync="pagination"
        :total-items="totalItems"
        :loading="loading">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.key }}</td>
          <td>{{ props.item.personName.firstName }}</td>
          <td>{{ props.item.personName.lastName }}</td>
        </template>
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      totalItems: 0,
      items: [],
      profiles: [],
      loading: true,
      pagination: {},
      headers: [
        { text: 'Key', value: 'key', align: 'left', sortable: false },
        { text: 'First Name', value: 'personName.firstName', align: 'left' },
        { text: 'Last Name', value: 'personName.lastName', align: 'left' }
      ]
    }
  },
  watch: {
    pagination: { handler () { this.getData() }, deep: true }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getNestedProp (obj, route) {
      let routes = []
      if (typeof (route) === 'string') { routes = route.split('.') }
      if (typeof (route) === 'object' && Array.isArray(route)) { routes = [...route] }
      if (routes.length === 0) { return obj }

      const propName = routes.splice(0, 1)
      if (!obj[propName]) { return undefined }

      return this.getNestedProp(obj[propName], routes)
    },
    sortSnapshotResult (arr, sortBy, descending) {
      if (!sortBy) { return arr }

      return arr.sort((a, b) => {
        const sortA = this.getNestedProp(a, sortBy)
        const sortB = this.getNestedProp(b, sortBy)
        if (descending) {
          if (sortA < sortB) { return 1 }
          if (sortA > sortB) { return -1 }
          return 0
        } else {
          if (sortA < sortB) { return -1 }
          if (sortA > sortB) { return 1 }
          return 0
        }
      })
    },
    snapshotToArray (snapshot) {
      const result = []
      snapshot.forEach(s => {
        const item = s.val()
        item.key = s.key
        result.push(item)
      })

      return result
    },
    getTableDataFromFirebase (route) {
      this.loading = true
      const { sortBy, descending, page, rowsPerPage } = this.pagination

      return window.firebase.database().ref(route).once('value')
        .then(snapshot => {
          let items = this.snapshotToArray(snapshot)
          items = this.sortSnapshotResult(items, sortBy, descending)
          const total = items.length

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }
          this.loading = false
          return { items, total }
        })
    },
    getData () {
      this.getTableDataFromFirebase('/app/profiles')
        .then(data => {
          this.profiles = data.items
          this.totalItems = data.total
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
