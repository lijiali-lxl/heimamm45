<template>
  <div class="ques-box">
    <!-- 饿了吗的卡片 -->
    <!-- 头部 -->
    <el-card class="box-card">
      <!-- 第一部分 -->
      <el-form :inline="true" :model="questFrom" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="questFrom.region" placeholder="请选择状态">
            <el-option label="已审批" value="shanghai"></el-option>
            <el-option label="待审批" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="questFrom.region" placeholder="请选择状态">
            <el-option label="已审批" value="shanghai"></el-option>
            <el-option label="待审批" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="questFrom.region" placeholder="请选择状态">
            <el-option label="已审批" value="shanghai"></el-option>
            <el-option label="待审批" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="questFrom.region" placeholder="请选择状态">
            <el-option label="已审批" value="shanghai"></el-option>
            <el-option label="待审批" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 第二部分 -->
      <el-form :inline="true" :model="questFrom" class="demo-form-inline">
        <el-form-item label="难度">
          <el-select v-model="questFrom.region" placeholder="请选择状态">
            <el-option label="已审批" value="shanghai"></el-option>
            <el-option label="待审批" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" class="author">
          <el-input v-model="questFrom.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="questFrom.region" placeholder="请选择状态">
            <el-option label="已审批" value="shanghai"></el-option>
            <el-option label="待审批" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" class="data">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="questFrom.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form>
      <!-- 第三部分 -->
      <el-form :inline="true" :model="questFrom" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="questFrom.user" class="title"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="onSubmit">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onSubmit">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 内容 -->
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="date" label="题目" width="180"></el-table-column>
        <el-table-column prop="name" label="学科.阶段" width="180"></el-table-column>
        <el-table-column prop="date" label="题型"></el-table-column>
        <el-table-column prop="date" label="企业"></el-table-column>
        <el-table-column prop="date" label="创建者"></el-table-column>
        <el-table-column prop="date" label="状态"></el-table-column>
        <el-table-column fixed="right" label="访问量" width="120">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="changePag"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-card>

   <!-- 新增会话框 -->
   <addquestion ref="addquestion"></addquestion>
   <editquestion ref="editquestion"></editquestion>
  </div>
</template>

<script>
// import E from 'wangeditor'
import addquestion from '../question/components/addquestion'
import editquestion from '../question/components/editquestion'
export default {
  components:{
    addquestion,editquestion
  },
  data() {
  
    return {
       editorContent: '',
      questFrom: {
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
        }
      ],
      //分页插件
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,

     
    };
  },
  methods: {
    //新增按钮
    onSubmit() {
      this.$refs.addquestion.dialogFormVisible = true;
    },
    //分页
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    //分页
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    },
    //编辑按钮
    edit(item){
      window.console.log(item)
      this.$refs.editquestion.dialogFormVisible=true
    },


    
  },

  
};
</script>

<style lang='less'>
.ques-box {
  .box-card {
    width: 100%;
    height: 227px;
    margin-bottom: 20px;
  }
  .changePag {
    text-align: center;
    margin-top: 20px;
  }
  .el-dialog {
    width: 602px;
  }
  .el-dialog__header {
    background: linear-gradient(to right, rgb(2, 192, 250), rgb(17, 154, 250));
  }
  .el-form demo-ruleForm {
    margin-left: 20px;
  }

  .el-form-item__label {
    margin-right: 30px;
    margin-left: 30px;
  }
  .author .el-input__inner {
    width: 217px;
  }
  .data .el-input__inner {
    width: 217px;
  }
  .title .el-input__inner {
    width: 388px;
  }
}
</style>
