<template>
  <div class="ques-box">
    <!-- 饿了吗的卡片 -->
    <!-- 头部 -->
    <el-card class="box-card">
      <!-- 第一部分 -->
      <el-form :inline="true" :model="questFrom" class="demo-form-inline" ref='questFrom'>
        <el-form-item label="学科" prop="subject">
          <el-select v-model="questFrom.subject" placeholder="请选择学科">
            <el-option
              :label="item.short_name"
              :value="item.id"
              v-for="(item) in subjectList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="questFrom.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="questFrom.enterprise" placeholder="请选择企业">
            <el-option
              :label="item.short_name"
              :value="item.id"
              v-for="(item) in enterpriseList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="type" >
          <el-select v-model="questFrom.type" placeholder="请选择题型">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
      
      <!-- 第二部分 -->
     
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="questFrom.difficulty" placeholder="请选择难度">
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" class="author" prop="username">
          <el-input v-model="questFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="状态"  prop="status">
          <el-select v-model="questFrom.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁止" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" class="data">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="questFrom.create_date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
  
      <!-- 第三部分 -->
     
        <el-form-item label="标题" prop="title">
          <el-input v-model="questFrom.title" class="title"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="del">清除</el-button>
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
             </el-table-column>
        <el-table-column fixed="right"  label="操作" width="120"> 
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="status(scope.row)">
             
              
              {{scope.row.status==1?"禁用":'启用'}}
            
           
            </el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
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
        :page-size="size"
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
import {questionList,questionStatus,questionRemove} from '@/api/question.js'
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
       size:2,
      questFrom: {
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: "",
  
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
      this.size=val
      this.page=1;
      this.getList()
    },
    //分页
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
      this.page=val;
      this.getList()
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
    //获取列表
    getList(){
       questionList({
      page:this.page,
      limit:this.size,
      ...this.questFrom
    }).then(res=>{
      window.console.log(res)
      this.tableData=res.data.items
      this.total=res.data.pagination.total
    })

    },
    search(){
      this.getList()
    },
    //清除按钮
    del(){
   this.$refs.questFrom.resetFields()
      
      this.getList()
    },
    //状态
    status(item){
      questionStatus({
        id:item.id
      }).then(res=>{
        window.console.log(res)
       if (res.code==200) {
           this.getList()
       }
      
      })
    },
    //删除按钮
    remove(item){
questionRemove({
  id:item.id
}).then(res=>{
  if (res.code==200) {
    this.$message.success('删除成功')
    if (this.tableData.length==1) {
      this.page--;
   
   this.page=this.page==1?'1':this.page
         
    }
     this.getList()
   
  }
})
    }


    
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
   this.getList()

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
   .el-form--inline .el-form-item:not(.control) {
    margin-right: 30px;
  }
}
</style>
