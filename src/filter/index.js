
import moment from 'moment'
import Vue from 'vue'

//全局过滤器
Vue.filter('filterTime',function(value){
return moment(value).format('YYYY-MM-DD')
})