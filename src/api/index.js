import axios from 'axios'


export function info(){
    return axios({
        url:process.env.VUE_APP_BASEURL+'/info',
        method:'get',
     headers:{
        token: window.localStorage.getItem('token')
     }
     
      })
}