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
      <el-form-item label="状态" :label-width="formLabelWidth" prop='status'>
        <el-select v-model="useraddfrom.status" placeholder="请选择状态">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注" :label-width="formLabelWidth" prop=remark>
        <el-input v-model="useraddfrom.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入校验规则
import {validatephone,validateemail} from '@/utils/rules.js'
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
        remark:'',
        status:''
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, validator: validateemail,trigger: "change", },
        ],
        phone: [
          { required: true,  trigger: "change",validator: validatephone, },
            
     
     
        ],
        role_id: [
        { required: true, message: "请输入活动名称", trigger: "change" },
         
        ],
      
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
              if (res.code==200) {
                  this.$message.success('新增成功')
                  this.dialogFormVisible=false
                  this.$refs.useraddfrom.resetFields()
                  this.$parent.list()
              }else{
                  this.$message.error(res.message)
              }
          })
        } else {
            window.console.log("111");
          return false;
        }
      });
    },
    resetForm(){
          this.$refs.useraddfrom.resetFields()
              this.dialogFormVisible=false
    }
  },
};
</script>

<style>
</style>