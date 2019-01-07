import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import router from './router'
import store from './store'
import './plugins/element.js'

import '@/styles/index.scss' // global css
import './icons' // icon
import './utils/permission' // permission
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
