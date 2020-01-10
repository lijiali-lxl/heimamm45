<template>
  <!-- 新增会话框 -->
  <el-dialog title="编辑企业" :visible.sync="dialogFormVisible" width="600px" center>
    <el-form
      :model="editentForm"
      :rules="rules"
      ref="editentForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="editentForm.eid"></el-input>
      </el-form-item>

      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="editentForm.name"></el-input>
      </el-form-item>

      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="editentForm.short_name"></el-input>
      </el-form-item>

      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="editentForm.intro"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="editentForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="submitedit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//引入路由
import {  entEdit } from "@/api/enterprise.js";
export default {
  data() {
    return {
      //会话框
      dialogFormVisible: false,
      formLabelWidth: "120px",
      editentForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击确定编辑提交按钮
    submitedit() {
      this.$refs.editentForm.validate(valid => {
        if (valid) {
               entEdit(this.editentForm).then(res => {
     if (res.code==200) {
         this.$message.success('编辑成功')
         this.dialogFormVisible=false
         this.$parent.getList()
     }
      });
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
   
  }
};
</script>

<style >
</style>