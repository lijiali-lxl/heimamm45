const key='token'

//保存token
export function saveToken(token){
    window.localStorage.setItem(key,token)
}

//取token
export function getToken(){
  return  window.localStorage.getItem(key,)
}


//清除token
export function removeToken(){
    window.localStorage.removeItem(key)
}