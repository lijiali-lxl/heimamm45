import request from '@/utils/request.js'

//删除学科
  export function subjectRemove(data){
    return request({
        url: '/subject/remove',
        method: "post",
      
        data,

      })
}

//添加学科
  export function addSubject(data){
    return request({
        url: '/subject/add',
        method: "post",
      
        data,

      })
}

//获取学科列表
  export function subjectList(params){
    return request({
        url: '/subject/list',
        method: "get",
      
        params,

      })
}

//修改学科状态
  export function subjectStatus(data){
    return request({
        url: '/subject/status',
        method: "post",
      
        data,

      })
}

//学科编辑
  export function subjectEdit(data){
    return request({
        url: '/subject/edit',
        method: "post",
      
        data,

      })
}



