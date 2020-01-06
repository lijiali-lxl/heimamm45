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
        <el-form-item prop="phone">
          <el-input
            class="high-input"
            v-model="ruleForm.phone"
            placeholder="请输入手机号码"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码验证 -->
        <el-form-item prop="password">
          <el-input
            class="high-input"
            v-model="ruleForm.password"
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <!-- 验证码 -->
            <el-col :span="18">
              <el-input
                class="high-input"
                prefix-icon="el-icon-key"
                v-model="ruleForm.code"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col class="code-col" :span="6">
              <!-- 一部分 -->
              <img :src="codeUrl" alt @click="codeChange" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            <span>和</span>
            <el-link type="primary">隐私条件</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')" class="login-btn reset-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧盒子 -->
    <div>
      <img src="../../assets/login_banner_ele.png" alt />
    </div>
    <!-- 注册用户会话 -->
    <el-dialog title="用户注册" center :visible.sync="dialogFormVisible">
      <el-form
        :model="regForm"
        :rules="rules"
        ref="regForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像" :label-width="formLabelWidth" prop="imgIcon">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1/heimamm/public/uploads"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" name="image" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="regForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="regForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="regForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="regForm.password"></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="rcode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="14">
              <el-input v-model="regForm.rcode"></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
              <img :src="regcodeUrl" alt @click="changeregCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 手机验证码 -->
        <el-form-item label="验证码" prop="phonecode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="14">
              <el-input v-model="regForm.phonecode"></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-button @click="getphoneCode" :disabled="delaytime !=0">{{getmsg}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <div class="footer">
          <el-button @click="resetRgeForm">取 消</el-button>
          <el-button type="primary" @click="register">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>


import { login, phoneCode, getregCode} from "../../api/login.js";
import {saveToken} from '../../utils/token'
const validatephone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号码"));
  } else {
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value) == true) {
      callback();
    } else {
      callback(new Error("小老弟，手机号码错了"));
      //判断正则
    }
  }
};
//自定义邮箱验证

var validateEmail = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    const regemail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (regemail.test(value) == true) {
      callback();
    } else {
      callback(new Error("小老弟邮箱号码错了"));
    }
  }
};
export default {
  data() {
    return {
      //验证码地址：
      regcodeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",

      //注册信息
      getmsg: "获取用户验证码",
      delaytime: 0,
      disable: false,
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      imageUrl: "",
      imgPath: "",
      dialogFormVisible: false,
      // 头像上传地址

      regForm: {
        name: "",
        imgIcon: "",
        email: "",
        phone: "",
        password: "",
        rcode: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validatephone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到12个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须为四位", trigger: "blur" }
        ],
        rcode: [
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须为四位", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入你的名称", trigger: "blur" },
          { min: 2,  trigger: "blur",message: "名称至少两位噢", }
        ],
        email: [
          { required: true, message: "请输入邮箱号", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ],
        imgIcon: [
          { required: true, message: "请输入头像，头像不能为空", trigger: "blur" },
          
        ]
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    submitForm(formName) {
      //调axios接口验证信息对不对
      if (this.ruleForm.checked == false) {
        this.$message.error("请先勾选协议噢");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$message.success('验证成功')
          login({
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
            code: this.ruleForm.code
          }).then(res => {
            //成功回调
            window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("登录成功");
              //把token存起来
            saveToken(res.data.data.token)
              //路由跳转到首页
              this.$router.push('/index/chart')
            } else {
              if (res.data.code == 202) {
                this.$message.error(res.data.message);
              }
            }
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogFormVisible = true;
      this.$refs[formName].resetFields();
      this.regcodeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&t=" + Date.now();
    },
    codeChange() {
      //在地址后面加上&t=+date.now()时间戳可以改变随机验证码
      // this.codeUrl=process.env.VUE_APP_BASEURL+"/captcha?type=login&t="+Date.now()
      //在地址后面加上&=+math.random可以产生随机数
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Math.random();
    },
    //头像文件上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgPath = res.data.file_path;
      this.regForm.imgIcon=this.imgPath
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //用户注册验证码变更
    changeregCode() {
      this.regcodeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&t=" + Date.now();
    },

    //点击注册用户的确认按钮
    register() {
         this.$refs.regForm.validate((valid) => {
          if (valid) {
           getregCode({
              username: this.regForm.name,
          phone: this.regForm.phone,
          email: this.regForm.email,
          avatar: this.imgPath,
          password: this.regForm.password,
          rcode: this.regForm.phonecode
           })
         
        
      .then(res => {
        //成功回调
        this.$message.success('恭喜你注册成功')
        this.dialogFormVisible=false
        window.console.log(res);

      });
          } else {
            window.console.log('error submit!!');
            return false;
          }
        });
      
    },
    //点击获取验证码的时候调用接口
    getphoneCode() {
      if (this.regForm.rcode.length != 4) {
        this.$message.error("验证码长度不对噢");
        return;
      }
      //设置一个倒计时信息
      if (this.delaytime ==0) {
        this.delaytime=60
      
        const timeInter = setInterval(() => {
          this.delaytime--;
          this.getmsg = `剩下还有${this.delaytime}噢`;
          if (this.delaytime == 0) {
            clearInterval(timeInter);
       this.getmsg='获取验证码'
          }
        }, 10);
      }
      
        //获取手机注册码
      phoneCode({
        code:this.regForm.rcode,
        phone: this.regForm.phone
      }).then(res => {
        //成功回调
        window.console.log(res);
       
        if (res.data.data.captcha==undefined) {
       
        this.$message.warning(res.data.message)
      
        }
        else{
           
        //  alert(res.data.data.captcha);
         
        this.$message.success("验证码是："+res.data.data.captcha)
      
        }
         
      });
    },
    //点击取消的时候重置注册表单
  resetRgeForm(){
     this.$refs.regForm.resetFields();
     
    
     this.imageUrl=''
     this.dialogFormVisible=false
  }
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
  .login-form {
    padding-right: 41px;
    margin-top: 27px;
    // 栅格 验证码
    .code-col {
      height: 40px;
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    // 更高的文本框
    .high-input > input {
      height: 45px;
      line-height: 45px;
    }
    // 表单内部的 按钮
    .login-btn {
      width: 100%;
      margin-left: 0;
    }
    .reset-btn {
      margin-top: 28px;
    }
    .Tcp {
      margin-left: 44px;
    }
  }
  // 用户注册样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-dialog {
    width: 603px;
    height: 787px;
  }
  .el-dialog__header {
    text-align: center;
    background: rgba(15, 159, 250);
  }
  .avatar-uploader {
    text-align: center;
  }
  .footer {
    text-align: center;
  }
}
</style>