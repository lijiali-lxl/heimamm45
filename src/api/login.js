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