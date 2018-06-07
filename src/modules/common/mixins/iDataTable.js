// TODO: Implement pagination in API
export default {
  data () {
    return {
      // vuetify options
      items: [],
      totalItems: 0,
      search: '',
      loading: true,
      pagination: {},
      // api options
      apiRoute: ''
    }
  },
  watch: {
    pagination: {
      handler (newVal, oldVal) {
        if (newVal.descending !== oldVal.descending || newVal.sortBy !== oldVal.sortBy) {
          this.sortDataArray(this.items, newVal.sortBy, newVal.descending)
        }
      },
      deep: true
    }
  },
  mounted () {
    this.getData(this.apiRoute)
  },
  methods: {
    getNestedProp (obj, path) {
      let paths = []
      if (typeof (path) === 'string') { paths = path.split('.') }
      if (typeof (path) === 'object' && Array.isArray(path)) { paths = [...path] }
      if (paths.length === 0) { return obj }

      const propName = paths.splice(0, 1)
      if (!obj[propName]) { return undefined }

      return this.getNestedProp(obj[propName], paths)
    },
    sortDataArray (arr, sortBy, descending) {
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
    getData (route) {
      this.loading = true
      const { sortBy, descending } = this.pagination
      // const { sortBy, descending, page, rowsPerPage } = this.pagination
      // const skip = (page - 1) * rowsPerPage
      // const take = rowsPerPage

      // return this.$http.get(route, { params: { skip, take } })
      return this.$http.get(route)
        .then(res => {
          let items = res.data
          this.sortDataArray(items, sortBy, descending)

          this.loading = false
          this.items = items
          this.totalItems = items.length

          return { items: items, totalItems: items.length }
        })
    }
  }
}
