import axios from 'axios'
import {getToken} from '@/utils/token.js'

const userRequest = axios.create({
    baseURL:process.env.VUE_APP_BASEURL

    
  });



  userRequest.interceptors.request.use(function (config) {
this.config.headers.token=getToken()
    return config;
  }, function (error) {

    return Promise.reject(error);
  });


axios.interceptors.response.use(function (response) {
  
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });

export function addUser(data){
    return userRequest({
        url: '/user/list',
        method: "post",
      
        data,

      })
}
export function addUser(data){
    return userRequest({
        url: '/user/list',
        method: "post",
      
        data,

      })
}
export function addUser(data){
    return userRequest({
        url: '/user/list',
        method: "post",
      
        data,

      })
}
export function addUser(data){
    return userRequest({
        url: '/user/list',
        method: "post",
      
        data,

      })
}
export function addUser(data){
    return userRequest({
        url: '/user/list',
        method: "post",
      
        data,

      })
}