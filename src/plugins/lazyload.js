import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload)
 
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})
 