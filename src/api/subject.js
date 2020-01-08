//引入axios
import axios from 'axios'
import {getToken} from '@/utils/token.js'


const subjectRequest = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
   
  
  });
  
//创建拦截器

subjectRequest.interceptors.request.use(function (config) {
config.headers.token=getToken()
    return config;
  }, function (error) {
   
    return Promise.reject(error);
  });


  subjectRequest.interceptors.response.use(function (response) {

    return response.data;
  }, function (error) {
  
    return Promise.reject(error);
  });


//删除学科
  export function subjectRemove(data){
    return subjectRequest({
        url: '/subject/remove',
        method: "post",
      
        data,

      })
}

//添加学科
  export function addSubject(data){
    return subjectRequest({
        url: '/subject/add',
        method: "post",
      
        data,

      })
}

//获取学科列表
  export function subjectList(params){
    return subjectRequest({
        url: '/subject/list',
        method: "get",
      
        params,

      })
}

//修改学科状态
  export function subjectStatus(data){
    return subjectRequest({
        url: '/subject/status',
        method: "post",
      
        data,

      })
}

//学科编辑
  export function subjectEdit(data){
    return subjectRequest({
        url: '/subject/edit',
        method: "post",
      
        data,

      })
}



