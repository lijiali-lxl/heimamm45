<template>
  <div class="login-containers">
    <div class="left">
      <!-- 左边头部 -->
      <div class="title-box">
        <img src="../../assets/login.png" alt class="iconimg" />
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
      <!-- 用户名 -->
      <el-input
        placeholder="请输入手机号"
        prefix-icon="el-icon-user"
        v-model="input2"
        class="phoneNumber"
      ></el-input>
      <!-- 密码框 -->
      <el-input
        placeholder="请输入密码"
        v-model="input"
        show-password
        prefix-icon="el-icon-lock"
        class="password"
      ></el-input>
      <el-row>
        <el-col class="col1" :span="6">
          <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="input2"></el-input>
        </el-col>
        <el-col class="col2" :span="6"></el-col>
      </el-row>
      <el-checkbox v-model="checked" class="Tcp">
        我已阅读并同意
        <el-link type="primary">用户协议</el-link>
        <span>和</span>
        <el-link type="primary">隐私条件</el-link>
      </el-checkbox>
      <div class="btn">
        <el-button type="primary" class="my-btn">登录</el-button>
        <el-button type="primary" class="my-btn">注册</el-button>
      </div>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>


<script>
export default {};
