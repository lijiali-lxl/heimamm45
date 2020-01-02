import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

Vue.config.productionTip = false

new Vue({
  //挂载
  router,
  render: h => h(App),
}).$mount('#app')
