import request from '@/utils/request.js'




  //新增用户信息
export function addUser(data){
    return request({
        url: '/user/add',
        method: "post",
      
        data,

      })
}
//获取用户列表
export function userList(params){
    return request({
        url: '/user/list',
        method: "get",
      
        params,

      })
}

//删除用户列表
export function delUser(data){
    return request({
        url: '/user/remove',
        method: "post",
      
        data,

      })
}
//切换用户状态
export function changeUser(data){
    return request({
        url: '/user/status',
        method: "post",
      
        data,

      })
}
//编辑用户信息
export function editUser(data){
    return request({
        url: '/user/edit',
        method: "post",
      
        data,

      })
}