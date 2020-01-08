<template>
  <el-dialog title="新增学科" :visible.sync="dialogFormVisible" class="addwindow" center>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('addForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//引入学科抽查的接口
import { addSubject } from "@/api/subject.js";

export default {
  data() {
    return {
      //对话框
      dialogTableVisible: false,
      dialogFormVisible: false,
      addForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
   
     //点击会话框确定按钮
    submitForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
        
          addSubject(this.addForm).then(res=>{
              window.console.log(res)
              if (res.code==200) {
                  this.$message.success('新增成功')
                  this.dialogFormVisible=false;
                  this.$parent.listinfo()
                
              }
              else{
                  if (res.code==201) {
                      this.$message.error('新增科目编号已存在')
                  }
              }
          })
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    //点击取消按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style>
</style>