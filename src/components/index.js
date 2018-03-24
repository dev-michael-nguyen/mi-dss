import Vue from 'vue'
import AppLeftNav from './AppLeftNav'
import BirthDateEditor from './BirthDateEditor'
import DateEditor from './DateEditor'
import TextEditor from './TextEditor'

export default function () {
  Vue.component('mi-app-left-nav', AppLeftNav)
  Vue.component('mi-birth-date-editor', BirthDateEditor)
  Vue.component('mi-date-editor', DateEditor)
  Vue.component('mi-text-editor', TextEditor)
}
