<template>
  <el-container class="index_box">
    <!-- 头部盒子 -->
    <el-header class="header-box">
      <div class="left">
        <i class="el-icon-s-fold icon" @click="kaiguan=!kaiguan"></i>
        <img class="login" src="../../assets/index-login.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <!-- 取仓库的数据 -->
        <img :src="avatar" alt class="userIcon" />
        <span class="username">{{username}},您好</span>
        <el-button size="small" type="primary" @click="exitBtn">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左边盒子 -->
      <el-aside width="auto" class="left-box">
        <!-- <el-col :span="24"> -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="kaiguan"
          router
        >
          <el-menu-item index="/index/chart" v-if="['超级管理员','管理员', '老师'].includes(getUserInfo.role) == true">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/index/user" v-if="['超级管理员','管理员'].includes(getUserInfo.role) == true">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/index/question" v-if="['超级管理员','管理员', '老师'].includes(getUserInfo.role) == true">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/index/enterprise" v-if="['超级管理员','管理员', '老师'].includes(getUserInfo.role) == true">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/index/subject" v-if="['超级管理员','管理员', '老师'].includes(getUserInfo.role) == true">
            <i class="el-icon-office-building"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
        <!-- </el-col> -->
      </el-aside>
      <!-- 右边盒子 -->
      <el-main class="right-box">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { logout } from "../../api/login";
//引入移出token工具
import { removeToken } from "../../utils/token";
// import axios from 'axios'
export default {
  data() {
    return {
      userInfo:{},
      kaiguan: false
    
    };
  },
  methods: {
    //点击退出按钮
    exitBtn() {
      //  window.localStorage.removeItem('token')
      this.$confirm("你确定要退出我们的黑马面面嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确定退出
          logout().then(res => {
            //成功回调
            if (res.data.code == 200) {
              removeToken();
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {});
    }
  },
  computed: {
    avatar() {
     return this.$store.state.userInfo.avatar;
    },
    username() {
      return this.$store.state.userInfo.username;
    },
     getUserInfo() {
      return this.$store.state.userInfo;
      // 返回数据即可
    },
  },

};
</script>

<style lang='less'>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
.index_box {
  height: 100%;
  //头部盒子
  .header-box {
    height: 60px;
    display: flex;
    justify-content: space-between;
    // 左边盒子
    .left {
      display: flex;
      align-items: center;
    }
    .icon {
      font-size: 24px;
      margin-right: 22px;
    }
    .logo {
      width: 33px;
      height: 28px;
    }
    .title {
      margin-left: 11px;
      color: #49a1ff;
    }
    //头部右边盒子
    .right {
      display: flex;
      align-items: center;
      .userIcon {
        height: 43px;
        width: 43px;
        border-radius: 50%;
        margin-right: 11px;
      }
      .username {
        margin-right: 38px;
        font-size: 14px;
      }
    }
  }

  //左边盒子
  .left-box {
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .right-box {
    background-color: #e8e9ec;
  }
}
</style>