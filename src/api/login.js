import axios from 'axios'


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