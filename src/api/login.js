import axios from 'axios'
// import token from '../../utils/token.js'


//抽查login登录接口
export function login(data){
    return axios({
        url: process.env.VUE_APP_BASEURL + "/login",
        method: "post",
        withCredentials: true,
        data,

        // data: {
        //   phone: this.ruleForm.phone,
        //   password: this.ruleForm.password,
        //   code: this.ruleForm.code
        // }
      })
}
//抽查注册验证码接口
export function phoneCode(data){
    return axios({
        url: process.env.VUE_APP_BASEURL + '/sendsms',
        method: "post",
        withCredentials: true,
        data,
      })
      
}
//抽查注册接口
export function getregCode(data){
    return     axios({
        url: process.env.VUE_APP_BASEURL + "/register",
        method: "post",
        withCredentials: true,
        data,
          
      })
      
}



//抽取获取用户信息接口
export function info(){
  return axios({
      url:process.env.VUE_APP_BASEURL+'/info',
      method:'get',
   headers:{
      token: window.localStorage.getItem('token')
   }
   
    })
}
//抽取登录退出接口
export function logout(){
  return axios({
      url:process.env.VUE_APP_BASEURL+'/logout',
      method:'get',
   headers:{
      token: window.localStorage.getItem('token')
   }
   
    })
}

