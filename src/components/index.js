import Vue from 'vue'
import DateEditor from './DateEditor'
import TextEditor from './TextEditor'

export default function () {
  Vue.component('mi-date-editor', DateEditor)
  Vue.component('mi-text-editor', TextEditor)
}
