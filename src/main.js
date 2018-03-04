// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from './router'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import ComponentsFactory from './components'

Vue.config.productionTip = false

Vue.use(Vuetify, { theme: {
  primary: '#2196F3',
  secondary: '#FAFAFA',
  accent: '#2196F3',
  error: '#BF360C',
  warning: '#FFAB00',
  info: '#0D47A1',
  success: '#1B5E20'
}})

ComponentsFactory()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
