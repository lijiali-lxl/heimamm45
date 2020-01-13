import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/base.css'
import './filter/index.js'
//导入Vuex
import store from '@/store/index.js'

Vue.use(ElementUI);




Vue.config.productionTip = false



//环境变量
window.console.log(process.env.VUE_APP_BASEURL)

new Vue({
  //挂载
  router,
  //Vuex
  store,
  render: h => h(App),
}).$mount('#app')
