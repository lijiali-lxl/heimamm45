import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'


//注册
Vue.use(VueRouter)


//实例化
const router =new VueRouter({
    routes:[
        {
            path:'/login',
            component:login
        },
        {
            path:'/index',
            component:index
        }
    ]
})


//暴露出去
export default router