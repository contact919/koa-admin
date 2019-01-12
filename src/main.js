import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'  // A modern alternative to CSS resets
import './plugins/element.js'
import './plugins/lazyload.js' // vue-lazyload
import '@/styles/index.scss'  // global css
import './icons'              // global icon component
import './utils/permission'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
