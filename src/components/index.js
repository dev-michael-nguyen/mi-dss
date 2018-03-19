import Vue from 'vue'
import DateEditor from './DateEditor'
import TextEditor from './TextEditor'
import AppLeftNav from './AppLeftNav.vue'

export default function () {
  Vue.component('mi-date-editor', DateEditor)
  Vue.component('mi-text-editor', TextEditor)
  Vue.component('mi-app-left-nav', AppLeftNav)
}
