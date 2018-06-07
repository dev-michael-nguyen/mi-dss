// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import ComponentsFactory from './components'
import App from './App'
import { router } from './router'

// VueJs config
Vue.config.productionTip = false

// vue-resource config
Vue.use(VueResource)
if (process.env.NODE_ENV === 'development') {
  Vue.http.options.root = 'https://us-central1-mi-dss-dev.cloudfunctions.net/app'
} else if (process.env.NODE_ENV === 'production') {
  // TBI: setup another project for production
  Vue.http.options.root = 'https://us-central1-mi-dss-dev.cloudfunctions.net/app'
}
Vue.http.options.emulateJSON = true

// vuetify config
Vue.use(Vuetify, { theme: {
  primary: '#2196F3',
  secondary: '#FAFAFA',
  accent: '#2196F3',
  error: '#BF360C',
  warning: '#FFAB00',
  info: '#0D47A1',
  success: '#1B5E20'
}})

// Filters
Vue.filter('date', function (val) {
  var d = val.split('-')
  return `${d[1]}/${d[2]}/${d[0]}`
})

// Components
ComponentsFactory()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
