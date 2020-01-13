import enterpriseRequest from '@/utils/request.js'

//新增企业信息
  export function addEnter(data){
      return enterpriseRequest({
        url:'/enterprise/add',
        method:'post',
        data,
      })
  }

  //企业列表获取
  export function entList (params){
 return enterpriseRequest({
        url:'/enterprise/list',
        method:'get',
        params,
      })
  }
  //编辑企业信息
  export function entEdit (data){
 return enterpriseRequest({
        url:'/enterprise/edit',
        method:'post',
        data,
      })
  }
  //编辑企业状态
  export function entStatus (data){
 return enterpriseRequest({
        url:'/enterprise/status',
        method:'post',
        data,
      })
  }
  //删除企业信息
  export function entRemove (data){
 return enterpriseRequest({
        url:'/enterprise/remove',
        method:'post',
        data,
      })
  }