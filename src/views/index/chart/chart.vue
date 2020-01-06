<template>
  <div class="chart-box">
      <!-- 饿了吗的卡片 -->
      <!-- 头部 -->
      <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="学科编号">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="学科名称">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.region" placeholder="请选择状态">
              <el-option label="已审批" value="shanghai"></el-option>
              <el-option label="待审批" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="onSubmit">清除</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="onSubmit">新增学科</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    
    <!-- 内容 -->
      <el-card >
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="date" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="180"></el-table-column>
        <el-table-column prop="date" label="简称"></el-table-column>
        <el-table-column prop="date" label="创建者"></el-table-column>
        <el-table-column prop="date" label="创建日期"></el-table-column>
        <el-table-column prop="date" label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <!-- 分页 -->
      <el-pagination
      class='changePag'
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
      </el-card>

      <!-- 新增对话框 -->
<el-dialog title="新增学科" :visible.sync="dialogFormVisible" class="addwindow" center>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="学科编号" :label-width="formLabelWidth" prop="sbjNumber">
      <el-input v-model="ruleForm.sbjNumber" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="学科名称" :label-width="formLabelWidth" prop="sbjName">
      <el-input v-model="ruleForm.sbjName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="学科简称" :label-width="formLabelWidth">
      <el-input v-model="ruleForm.sbjShort" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="学科简介" :label-width="formLabelWidth" >
      <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="学科备注" :label-width="formLabelWidth" >
      <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
 

    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="resetForm('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>


  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      //分页插件
       currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        
        //对话框
          dialogTableVisible: false,
        dialogFormVisible: false,
         ruleForm: {
          sbjNumber: '',
          region: '',
          
        },
         rules: {
          sbjNumber: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          sbjName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          
        },
        formLabelWidth: '80px'
    };
  },
  methods: {
    //新增按钮
    onSubmit() {
         this.dialogTableVisible=true
         this.dialogFormVisible=true
      },
      //分页
      handleSizeChange(val) {
       window. console.log(`每页 ${val} 条`);
      },
      //分页
      handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
      },
      //点击会话框确定按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            window.console.log('error submit!!');
            return false;
          }
        });
      },
      //点击取消按钮
       resetForm(formName) {
        this.$refs[formName].resetFields();
          this.dialogFormVisible=false
      }
  },
};
</script>

<style lang='less'>
.chart-box {
  .box-card {
    width: 100%;
    height: 103px;
    margin-bottom: 20px;
  }
  .changePag{
    text-align: center;
    margin-top: 20px;
  }
  .el-dialog{
    width: 602px;
  }
  .el-dialog__header{
    background: linear-gradient(to right,rgb(2, 192, 250),rgb(17, 154, 250));
  }

}
</style>
