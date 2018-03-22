// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import ComponentsFactory from './components'
import App from './App'
import { router } from './router'

// Initialize Firebase
if (process.env.NODE_ENV === 'development') {
  const config = {
    apiKey: 'AIzaSyAuOHYG75ve4NFVcP1B_kHdDnjjvL4EfHw',
    authDomain: 'mi-dss-dev.firebaseapp.com',
    databaseURL: 'https://mi-dss-dev.firebaseio.com',
    projectId: 'mi-dss-dev',
    storageBucket: 'mi-dss-dev.appspot.com',
    messagingSenderId: '1090115059506'
  }
  window.firebase.initializeApp(config)
} else if (process.env.NODE_ENV === 'production') {
  // TBI: setup another project for production
  const config = {
    apiKey: 'AIzaSyAuOHYG75ve4NFVcP1B_kHdDnjjvL4EfHw',
    authDomain: 'mi-dss-dev.firebaseapp.com',
    databaseURL: 'https://mi-dss-dev.firebaseio.com',
    projectId: 'mi-dss-dev',
    storageBucket: 'mi-dss-dev.appspot.com',
    messagingSenderId: '1090115059506'
  }
  window.firebase.initializeApp(config)
}

// VueJs config
Vue.config.productionTip = false

// vue-resource config
Vue.use(VueResource)
Vue.http.options.root = 'https://us-central1-mi-dss-dev.cloudfunctions.net/app'
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

ComponentsFactory()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
