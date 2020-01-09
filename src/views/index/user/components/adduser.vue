<template>
  <!-- 新增对话框 -->
  <el-dialog title="新增用户" :visible.sync="dialogFormVisible" class="addwindow" center>
    <el-form
      :model="useraddfrom"
      :rules="rules"
      ref="useraddfrom"
      label-width="100px"
      class="demo-useraddfrom"
    >
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="useraddfrom.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="useraddfrom.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="useraddfrom.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
        <el-select v-model="useraddfrom.role_id" placeholder="请选择角色">
           <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="useraddfrom.region" placeholder="请选择状态">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注" :label-width="formLabelWidth" prop=remark>
        <el-input v-model="useraddfrom.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('useraddfrom')">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//自定义手机号码校验规则
 var validatephone = (rule, value, callback) => {
     const reg=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (reg.test(value)!=true) {
               callback(new Error('手机号码格式不对噢'));
          }
          callback();
        }
      };
 var validateemail = (rule, value, callback) => {
     const reg=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (reg.test(value)!=true) {
               callback(new Error('邮箱格式不对噢'));
          }
          callback();
        }
      };
import {addUser}from '@/api/user.js'
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
         useraddfrom: {
        username: "",
        email: "",
        phone: "",
        role: "",
        remark:''
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { validator: validateemail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
                { validator: validatephone, trigger: 'blur' }
     
     
        ],
        // role_id: [
        //   { required: true },
         
        // ],
      
      },
      formLabelWidth: "80px"
    };
  },methods: {
        submitForm() {
      this.$refs.useraddfrom.validate(valid => {
        if (valid) {
          addUser(this.useraddfrom
          ).then(res=>{
              window.console.log(res)
              if (res.data.code==200) {
                  this.$message.success('新增成功')
                  this.dialogFormVisible=false
              }else{
                  this.$message.error(res.data.message)
              }
          })
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>