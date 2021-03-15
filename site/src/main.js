import Vue from 'vue'
import Vuex from './assets/vuex'
import App from './App.vue'

new Vue({
  el: '#app',
  store: Vuex,
  render: h => h(App)
})
