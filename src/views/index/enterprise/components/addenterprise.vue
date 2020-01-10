<template>
  <!-- 新增会话框 -->
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="600px" center>
    <el-form
      :model="addentForm"
      :rules="rules"
      ref="addentForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="addentForm.eid"></el-input>
      </el-form-item>

      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="addentForm.name"></el-input>
      </el-form-item>

      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="addentForm.short_name"></el-input>
      </el-form-item>

      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="addentForm.intro"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="addentForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="remove">取 消</el-button>
      <el-button type="primary" @click="submitadd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//引入路由
import { addEnter } from "@/api/enterprise.js";
export default {
  data() {
    return {
      //会话框
      dialogFormVisible: false,
      formLabelWidth: "120px",
      addentForm: {
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

    
    //点击确定新增提交按钮
    submitadd() {
      this.$refs.addentForm.validate(valid => {
        if (valid) {
          addEnter(this.addentForm).then(res => {
            window.console.log(res);
            if (res.code==200) {
                this.$message.success('新增成功')
                this.dialogFormVisible=false
                 this.$refs.addentForm.resetFields()
                 this.$parent.getList()
            }else if(res.code==201){
                this.$message.error('用户编号已存在')
               
            }
          });
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    remove(){
      this.$refs.addentForm.resetFields()
      this.dialogFormVisible=false
    }
  }
};
</script>

<style >
</style>