import axios from 'axios'
import {getToken} from  '@/utils/token.js'



const chartRequest = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
   
  });

  chartRequest.interceptors.request.use(function (config) {
   config.headers.token=getToken()
    return config;
  }, function (error) {

    return Promise.reject(error);
  });


  chartRequest.interceptors.response.use(function (response) {

    return response.data;
  }, function (error) {
  
    return Promise.reject(error);
  });
//获取统计数据
export function getChart(data){
    return chartRequest({
        url: '/data/title',
        method: "post",
      
        data,

      })
}
//获取企业数据接口
export function entChart(data){
    return chartRequest({
        url: '/data/statistics',
        method: "post",
      
        data,

      })
}
