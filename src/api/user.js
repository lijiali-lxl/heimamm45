import axios from 'axios'
import {getToken} from '@/utils/token.js'

const userRequest = axios.create({
    baseURL:process.env.VUE_APP_BASEURL

    
  });



  userRequest.interceptors.request.use(function (config) {
config.headers.token=getToken()
    return config;
  }, function (error) {

    return Promise.reject(error);
  });


axios.interceptors.response.use(function (response) {
  
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  //新增用户信息
export function addUser(data){
    return userRequest({
        url: '/user/add',
        method: "post",
      
        data,

      })
}
//获取用户列表
export function userList(params){
    return userRequest({
        url: '/user/list',
        method: "get",
      
        params,

      })
}

//删除用户列表
export function delUser(data){
    return userRequest({
        url: '/user/remove',
        method: "post",
      
        data,

      })
}
//切换用户状态
export function changeUser(data){
    return userRequest({
        url: '/user/status',
        method: "post",
      
        data,

      })
}
//编辑用户信息
export function editUser(data){
    return userRequest({
        url: '/user/edit',
        method: "post",
      
        data,

      })
}