import request from '@/utils/request.js'

//删除学科
  export function questionRemove(data){
    return request({
        url: '/question/remove',
        method: "post",
      
        data,

      })
}

//添加学科
  export function addquestion(data){
    return request({
        url: '/question/add',
        method: "post",
      
        data,

      })
}

//获取学科列表
  export function questionList(params){
    return request({
        url: '/question/list',
        method: "get",
      
        params,

      })
}

//修改学科状态
  export function questionStatus(data){
    return request({
        url: '/question/status',
        method: "post",
      
        data,

      })
}

//学科编辑
  export function questionEdit(data){
    return request({
        url: '/question/edit',
        method: "post",
      
        data,

      })
}



