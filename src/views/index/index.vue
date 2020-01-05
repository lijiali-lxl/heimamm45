<template>
  <el-container class="index_box">
    <!-- 头部盒子 -->
  <el-header class="header-box" >
    <div class="left ">
      <i class="el-icon-s-fold icon"></i>
      <img class="login" src="../../assets/index-login.png" alt="" >
      <span class='title'>黑马面面</span>
    </div>
    <div class="right">

      <img :src="userInfo.avatar" alt="" class="userIcon" >
      <span class="username">{{userInfo.username}},您好</span>
        <el-button size="small" type="primary" @click="exitBtn">退出</el-button>
    </div>
  </el-header>
  <el-container>
    <!-- 左边盒子 -->
    <el-aside width="200px" class="left-box">Aside</el-aside>
    <!-- 右边盒子 -->
    <el-main class="right-box">Main</el-main>
  </el-container>
</el-container>

</template>

<script>
import {info} from '../../api/index'
// import axios from 'axios'
export default {
  data() {
    return {
      userInfo:{}
    }
  },
methods: {
 exitBtn(){
  //  window.localStorage.removeItem('token')
   this.$router.push('/login')
 }
},
 created() {
    window.console.log('11111')
    //请求用户信息
    info()
    .then(res=>{
        //成功回调
        window.console.log(res)
        this.userInfo=res.data.data
        this.userInfo.avatar= process.env.VUE_APP_BASEURL+'/'+ this.userInfo.avatar

      });
  },
}
</script>

<style lang='less'>
html,body{
  height: 100%;
}
.index_box{
  height: 100%;
  //头部盒子
  .header-box{
    height: 60px;
    display: flex;
      justify-content: space-between;
      // 左边盒子
      .left{
      display: flex;
      align-items: center
    }
     .icon{
   font-size: 24px;
   margin-right: 22px;
  }
  .logo{
    width: 33px;
    height: 28px;
   
  }
  .title{
    margin-left: 11px;
    color: #49A1FF
  }
  //头部右边盒子
  .right{
    display: flex;
    align-items: center;
    .userIcon{
      height: 43px;
      width: 43px;
      border-radius: 50%;
      margin-right: 11px;
    }
    .username{
      margin-right: 38px;
      font-size: 14px
    }
  }
  }
  
  //左边盒子
  .left-box{

    width: 201px;
    background-color: brown
  }
  .right-box{
    background-color: rgb(32, 218, 218)
  }
 
}
</style>