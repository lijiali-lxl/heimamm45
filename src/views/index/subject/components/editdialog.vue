<template>
  <el-dialog title="编辑学科" :visible.sync="dialogFormVisible" class="addwindow" center>
    <el-form :model="eidtForm" ref="eidtForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="eidtForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="eidtForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="eidtForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="eidtForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="eidtForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('eidtForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectEdit } from "@/api/subject.js";

export default {
  data() {
    return {
      //对话框

      dialogFormVisible: false,
      eidtForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },

      formLabelWidth: "80px"
    };
  },
  methods: {
    //点击会话框确定按钮
    submitForm() {
      this.$refs.eidtForm.validate(valid => {
        if (valid) {
          subjectEdit(this.eidtForm).then(res=>{
              window.console.log('111')
              window.console.log(res)
              if (res.code==200) {
                  this.$message.success('编辑成功')
               
                   this.$parent.listinfo();
          this.dialogFormVisible = false;
              }else{
                  if (res.code==201) {
                       this.$message.error("学科编号已存在")
                  }
              }
          });
         
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    //点击取消按钮
    resetForm() {
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style>
</style>