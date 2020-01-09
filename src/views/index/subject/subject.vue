<template>
  <div class="chart-box">
    <!-- 饿了吗的卡片 -->
    <!-- 头部 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref='formInline'>
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formInline.name" ></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username" ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="clearFrom">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onSubmit">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 内容 -->
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="180"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{scope.row.creat_time | filterTime}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0" class="girl">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editSubject(scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="changStuat(scope.row)"
            >{{scope.row.status==0?'启用':'禁用'}}</el-button>

            <el-button type="text" size="small" @click="handleClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="changePag"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pagesizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 新增对话框 -->
    <addForm ref="addForm"></addForm>
    <!-- 编辑对话框 -->
    <eidtForm ref="eidtForm"></eidtForm>
  </div>
</template>

<script>
import axios from "axios";
//引入抽取的会话框组件
import addForm from "../subject/components/dialog.vue";
import eidtForm from '../subject/components/editdialog.vue'
//引入学科抽查的接口
import { subjectStatus, subjectList} from "@/api/subject.js";
export default {
  components: {
    addForm,
    eidtForm
  },
  data() {
    return {
      //总页数
      total: 0,
      page: 0,
      size: 2,
      pagesizes:[2,4,6,8],
      formInline: {
        rid: "",
        name: "",
        username:"",
        status:''
      },
      tableData: []
   
    };
  },
  methods: {
    //删除按钮
    handleClick(scope) {
      // window.console.log(scope.id);
      axios({
        url: process.env.VUE_APP_BASEURL + "/subject/remove",
        method: "post",
        data: { id: scope.id },
        headers: {
          token: window.localStorage.getItem("token")
        }
      }).then(res => {
        //成功回调
        window.console.log(res);
        window.console.log("删除成功");
        if (this.tableData.length==1) {
          this.page--;
           this.page=this.page==0?'1':this.page
        }
       
        this.listinfo()
      });
    },
    onSubmit() {
      this.$refs.addForm.dialogFormVisible = true;
    },
    //分页容页
    handleSizeChange(size) {
      window.console.log(`每页 ${size} 条`);
      this.size=size;
      this.page=1
      this.listinfo()
    },
    //分页--当前页面改变
    handleCurrentChange(current) {
      window.console.log(`当前页: ${current}`);
      this.page=current
      this.listinfo()
     
  
    
    },

    //改变状态
    changStuat(item) {
      subjectStatus({
        id: item.id
      }).then(res => {
        //成功回调
        window.console.log(res);
        if (res.code == 200) {
          this.listinfo();
        }
      });
    },
    //获取列表信息
    listinfo() {
      subjectList({
        page: this.page,
        limit: this.size
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.items;
        this.total = res.data.pagination.total;
      });
    },
    //点击查询获取列表
    search(){
 
      subjectList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.items;
        this.total = this.tableData.length;
      });
    
    },
    //点击清除按钮
    clearFrom(){
      this.$refs.formInline.resetFields()
      this.listinfo()
    },
    //点击编辑按钮
    editSubject(item){
   this.$refs.eidtForm.dialogFormVisible=true;
  
  this.$refs.eidtForm.eidtForm= JSON.parse(JSON.stringify(item));

    }
  },
  created() {
   this.listinfo() 
  }
};
</script>

<style lang='less'>
.chart-box {
  .box-card {
    width: 100%;
    height: 103px;
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
  .girl {
    color: red;
  }
}
</style>

