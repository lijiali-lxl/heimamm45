import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'


//嵌套路由
import chart from '../views/index/chart/chart.vue'
import user from '../views/index/user/user.vue'
import question from '../views/index/question/question.vue'
import enterprise from '../views/index/enterprise/enterprise.vue'
import subject from '../views/index/subject/subject.vue'
import {
    getToken,
    removeToken
} from '@/utils/token.js'

//按需导入elementui
import {
    Message
} from 'element-ui';

//引入仓库
import store from '@/store/index.js'
//注册



import {
    info
} from '@/api/login'


Vue.use(VueRouter)
//实例化
const router = new VueRouter({
    routes: [{
            path: '/login',
            component: login,
            meta: {
                roles: ['超级管理员', '管理员', '老师', '学生']
            }
        },
        {
            path: '/index',
            component: index,
            //重定向 跳到指定页面
            redirect: ('/index/user'),
            meta: {
                roles: ['超级管理员', '管理员', '老师', '学生']
            },
            children: [{
                    path: 'chart',
                    component: chart,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师']
                    }

                },
                {
                    path: 'user',
                    component: user,
                    meta: {
                        roles: ['超级管理员', '管理员']
                    }
                },
                {
                    path: 'question',
                    component: question,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师', ]
                    }
                },
                {
                    path: 'enterprise',
                    component: enterprise,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师', ]
                    }
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师', '学生']
                    }
                }
            ]
        }
    ]
})
const whitePath = ["/login"]
router.beforeEach((to, from, next) => {

    window.console.log(next);
    // window.console.log('111', token);


    //设置一个白名单   toLocaleLowerCase  大写统一转小写
    if (whitePath.includes(to.path.toLocaleLowerCase()) == true) {

        next()
    } else {
        const token = getToken()
        if (token === null) {
            Message.error('请先登录')
            next('/login')
            return
        } else {
            info()
                .then(res => {
                    window.console.log(res)
                    //成功回调
                    if (res.data.code === 206) {
                        Message.error('你是假的token噢')
                        removeToken()
                        next('/login')

                    } else {
                        if (res.data.data.status === 0) {
                            Message.warning("你当前是禁用状态，请等待管理员将你启用，在访问");
                            next("/login");
                        } else {
                            window.console.log(res)
                            store.state.userInfo = res.data.data
                            store.state.userInfo.avatar = process.env.VUE_APP_BASEURL + '/' + store.state.userInfo.avatar

                            if (to.meta.roles.includes(store.state.userInfo.role) == true) {
                                next()
                            } else {
                                Message.error('你没有权限')
                            }

                        }
                    }





                });

        }

    }

})


//暴露出去
export default router