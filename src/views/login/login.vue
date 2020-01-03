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

      <el-form>
        <el-form-item class="phoneNumber">
          <el-input v-model="input1" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            v-model="input"
            show-password
            prefix-icon="el-icon-lock"
            class="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col class="col1" :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="input2"></el-input>
            </el-col>
            <el-col class="col2" :span="7"> <img
               
              /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked" class="Tcp">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            <span>和</span>
            <el-link type="primary">隐私条件</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="my-btn">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="my-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      input1: "",
      input2: "",
      checked: "",
      actions:''
    };
  },
  
};
</script>

<style lang='less'>
.login-containers {
  height: 100%;
  display: flex;
  /*  */
  justify-content: space-around;
  align-items: center;
  /* 颜色渐变 */
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );

  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-top: 44px;
    box-sizing: border-box;
  }
  .title {
    font-size: 24px;
    font-weight: 400;
    margin-right: 14px;
  }
  .iconimg {
    width: 22px;
    height: 17px;
    margin-right: 16px;
  }
  .title-box {
    display: flex;
    margin-left: 48px;
    align-items: center;
  }
  .line {
    width: 1px;
    height: 28px;
    background-color: red;
    margin-right: 12px;
  }
  .sub-title {
    font-size: 22px;
    font-weight: 400;
  }
  .phoneNumber {
    width: 394px;
    height: 49px;
    margin-left: 43px;
    margin-top: 31px;
  }
  .password {
    height: 47px;
    width: 394px;
    // margin-top: 25px;
    margin-left: 43px;
  }
  .col1 {
    width: 284px;
    height: 48px;
    margin-left: 42px;
    // margin-top: 26px;
    // margin-bottom: 32px;
  }
  .Tcp {
    margin-left: 44px;
  }
  .my-btn {
    width: 394px;
    height: 44px;
    margin-bottom: 20px;
    margin-left: 43px;
  }
//   .my-btn + .my-btn {
//     margin: 0;
//   }
.col2{
    width: 110px;
    height: 38px;
    background-color: pink
}
}
</style>