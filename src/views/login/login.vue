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

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="43px"
        class="demo-ruleForm login-form"
      >
      <!-- 手机号码验证 -->
        <el-form-item  prop="phone">
          <el-input class="high-input" v-model="ruleForm.phone" placeholder="请输入手机号码" prefix-icon="el-icon-user" ></el-input>
        </el-form-item>
        <!-- 密码验证 -->
        <el-form-item  prop="password">
          <el-input class="high-input" v-model="ruleForm.password" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" ></el-input>
        </el-form-item>
        
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <!-- 验证码 -->
            <el-col :span="18">
              <el-input class="high-input" prefix-icon="el-icon-key" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col class="code-col" :span="6">
              <!-- 一部分 -->
              <img :src="codeUrl" alt="" @click="codeChange" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item>
          <el-checkbox  v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            <span>和</span>
            <el-link type="primary">隐私条件</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button class="login-btn reset-btn" type="primary" @click="resetForm('ruleForm')">注册</el-button>
        </el-form-item>
  </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>

import axios from 'axios'
  const validatephone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
         const reg=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
          if(reg.test(value)==true){
                callback();
          }
          else{
            callback(new Error('小老弟，手机号码错了'))
          //判断正则
          
          }
          
        }
      };
export default {
   data() {
    
      return {
         //验证码地址：
        codeUrl:process.env.VUE_APP_BASEURL+'/captcha?type=login',
        ruleForm: {
          phone: '',
         password:'',
         code:'',
         checked:false,
        },
        rules: {
          phone: [
            { validator: validatephone, trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到12个字符', trigger: 'change' }
          ],
           code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '长度必须为四位', trigger: 'change' }
          ],
         
        }
      };
    },
    methods: {
      submitForm(formName) {
        //调axios接口验证信息对不对
       if (this.ruleForm.checked==true) {
          axios({
          url:process.env.VUE_APP_BASEURL+'/login',
          method:'post',
          withCredentials:true,

          data: { 
            phone:this.ruleForm.phone,
            password:this.ruleForm.password,
            code:this.ruleForm.code,
          },
        }).then(res=>{
          //成功回调
          window.console.log(res)
          if (res.data.code==200) {
            this.$message.success('验证成功')
          }else {
            if(res.data.code==202){
            this.$message.error(res.data.message)
          } }
        });
       }
        this.$refs[formName].validate((valid) => {
          if (valid) {
          // this.$message.success('验证成功')
          } else {
            this.$message.error('验证失败')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      codeChange(){
        //在地址后面加上&t=+date.now()时间戳可以改变随机验证码
        // this.codeUrl=process.env.VUE_APP_BASEURL+"/captcha?type=login&t="+Date.now()
        //在地址后面加上&=+math.random可以产生随机数
        this.codeUrl=process.env.VUE_APP_BASEURL+'/captcha?type=login&t='+Math.random()
      }
    }
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
  .login-form{
      padding-right: 41px;
      margin-top: 27px;
      // 栅格 验证码
      .code-col {
        height: 40px;
        img{
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
      // 更高的文本框
      .high-input >input{
        height: 45px;
        line-height: 45px
      }
      // 表单内部的 按钮
    .login-btn {
      width: 100%;
      margin-left: 0;
    }
    .reset-btn{
      margin-top: 28px;
    }
    .Tcp {
    margin-left: 44px;
  }
    }
    
  
}
</style>