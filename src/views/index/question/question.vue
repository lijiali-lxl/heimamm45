<template>
  <div class="ques-box">
    <!-- 饿了吗的卡片 -->
    <!-- 头部 -->
    <el-card class="box-card">
      <!-- 第一部分 -->
      <el-form :inline="true" :model="questFrom" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="questFrom.region" placeholder="请选择状态">
            <el-option
              :label="item.short_name"
              :value="item.id"
              v-for="(item) in subjectList"
              :key="item.id"
            ></el-option>
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
            <el-option
              :label="item.short_name"
              :value="item.id"
              v-for="(item) in enterpriseList"
              :key="item.id"
            ></el-option>
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
        <el-table-column prop="title" label="题目" width="180">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column prop="subject_name" label="学科.阶段" width="180">
          <template slot-scope="scope">
            <div>{{scope.row.subject_name+'.'+{1:'初级',2:'中级',3:'高级'}[scope.row.step]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <div>{{{1:'单选',2:'多选',3:'简答'}[scope.row.type]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="reads" label="访问量" width="120">
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
        :current-page="currentPage"
        :page-sizes="pageSize"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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
import {subjectList} from '@/api/subject.js'
import {entList} from '@/api/enterprise.js'
import {questionList} from '@/api/question.js'
export default {
  name:'question',
  components:{
    addquestion,editquestion
  },
  data() {
  
    return {
        total:0,
      currentPage:0,
       editorContent: '',
       pageSize:[2,4,6,8],
      questFrom: {
        user: "",
        region: ""
      },
      tableData: [
       
      ],
      //分页插件
    
      //学科信息
      subjectList:[],
      //企业信息
      enterpriseList:[],
    

     
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
       const editForm = JSON.parse(JSON.stringify(item));
       this.$refs.editquestion.editquestionForm=editForm
       editForm.city = editForm.city.split(',');
  
        this.$refs.editquestion.editquestionForm.city= editForm.city
        this.$refs.editquestion.editquestionForm.multiple_select_answer=  editForm.multiple_select_answer.split(
        ',');
        const options=[];
       editForm.select_options.forEach(v => {
        if (v.label == 'A') {
          options[0] = v;
        } else if (v.label == 'B') {
          options[1] = v;
        } else if (v.label == 'C') {
          options[2] = v;
        } else {
          options[3] = v;
        }
      });
          this.$refs.editquestion.editquestionForm.select_options = options;
          
      // 挨个的设置 图片 视频地址
      if (editForm.select_options[0].image != '') {
        this.$refs.editquestion.imageUrlA =
          process.env.VUE_APP_BASEURL + '/' + editForm.select_options[0].image;
      }
      if (editForm.select_options[1].image != '') {
        this.$refs.editquestion.imageUrlB =
          process.env.VUE_APP_BASEURL + '/' + editForm.select_options[1].image;
      }
      if (editForm.select_options[2].image != '') {
        this.$refs.editquestion.imageUrlC =
          process.env.VUE_APP_BASEURL + '/' + editForm.select_options[2].image;
      }
      if (editForm.select_options[3].image != '') {
        this.$refs.editquestion.imageUrlD =
          process.env.VUE_APP_BASEURL + '/' + editForm.select_options[3].image;
      }
      if (editForm.video != '') {
        this.$refs.editquestion.videoURL =
          process.env.VUE_APP_BASEURL + '/' + editForm.video;
      }

    },


    
  },
  created() {
    //获取学科信息
    subjectList().then(res=>{
      window.console.log(res)
      this.subjectList=res.data.items

    })
    //获取企业信息
    entList().then(res=>{
      this.enterpriseList=res.data.items

    })
    //获取题库信息
    questionList({
      page:this.page,
      limit:this.size
    }).then(res=>{
      this.tableData=res.data.items
      this.total=res.data.pagination.total
    })

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
