<template>
  <!-- 编辑对话框 -->
  <el-dialog title="新增用户" :visible.sync="dialogFormVisible" class="addwindow" center>
    <el-form
      :model="usereditfrom"
      :rules="rules"
      ref="usereditfrom"
      label-width="100px"
      class="demo-usereditfrom"
    >
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="usereditfrom.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="usereditfrom.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="usereditfrom.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
        <el-select v-model="usereditfrom.role_id" placeholder="请选择角色">
           <el-option label="超级管理员" :value="1"></el-option>
           <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" :label-width="formLabelWidth" >
        <el-select v-model="usereditfrom.status" placeholder="请选择状态">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注" :label-width="formLabelWidth" prop=remark>
        <el-input v-model="usereditfrom.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入校验规则
import {validatephone,validateemail} from '@/utils/rules.js'
import {editUser}from '@/api/user.js'
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
         usereditfrom: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        remark:'',
        status:''
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, trigger: "change",validator: validateemail },
     
        ],
        phone: [
          { required: true,  trigger: "change", validator: validatephone},
          
     
     
        ],
      
      
      },
      formLabelWidth: "80px"
    };
  },methods: {
        submitForm() {
      this.$refs.usereditfrom.validate(valid => {
        if (valid) {
          editUser(this.usereditfrom).then(res=>{
            window.console.log(res)
            this.$message.success('编辑成功')
            this.$parent.list()
            this.dialogFormVisible=false
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