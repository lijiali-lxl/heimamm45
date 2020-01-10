<template>
   <!-- 编辑对话框 -->
    <el-dialog title="编辑题库测试" :visible.sync="dialogFormVisible" class="addwindow" center>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学科" prop="role" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.role" placeholder="请选择角色">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="role" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.role" placeholder="请选择角色">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="role" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.role" placeholder="请选择角色">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="role" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.role" placeholder="请选择角色">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="题型" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="单选"></el-radio>
            <el-radio label="多选"></el-radio>
            <el-radio label="简答"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="简单"></el-radio>
            <el-radio label="一般"></el-radio>
            <el-radio label="困难"></el-radio>
          </el-radio-group>
        </el-form-item>
          <el-divider></el-divider>
           <div>
        <div ref="editor" style="text-align:left"></div>
        <button >查看内容</button>
    </div>
        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
data() {
    return {
         //对话框
      dialogTableVisible: false,
      dialogFormVisible: false,
      ruleForm: {
      
        role: ""
      },
      rules: {
        role: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        // email: [
        //   { required: true, message: "请输入活动名称", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        // ],
        // phone: [
        //   { required: true, message: "请输入活动名称", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        // ],
        // role: [
        //   { required: true, message: "请输入活动名称", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        // ]
      },
      formLabelWidth: "80px"
    }
},
methods: {
      submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    //点击取消按钮
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false;
    },
},
}
</script>

<style>

</style>