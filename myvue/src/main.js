// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$host = 'http://172.16.8.30:8888'
Vue.prototype.$echarts = echarts
Vue.prototype.$bg = function (bg) {
  var index = document.getElementById('myindex')
  var bachg = bg
  index.style.background = bachg
}
Vue.prototype.$login = function (a) {
  if (typeof a === typeof 1) {
    this.$root.a = false
  } else {
    this.$root.a = true
  }
}
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data () {
    return {
      a: true
    }
  }
})
