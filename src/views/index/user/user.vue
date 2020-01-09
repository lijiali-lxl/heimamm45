<template>
  <div class="user-box">
    <!-- 饿了吗的卡片 -->
    <!-- 头部 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="userfrom" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="userfrom.user"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="userfrom.email"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role_id">
          <el-select v-model="userfrom.role_id" placeholder="请选择状态">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="onSubmit">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onSubmit">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 内容 -->
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色">
          <template slot-scope="scope">
            <span v-if="scope.row.role_id==2">管理员</span>
            <span v-else-if="scope.row.role_id==3">老师</span>
            <span v-else>学生</span>
            <!-- <span>{{scope.row.role_id}}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="edituser(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="change(scope.row)"
            >{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
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
    <!-- 使用adduser会话框 -->
    <adduser ref="adduser"></adduser>
    <edituser ref="edituser"></edituser>
  </div>
</template>

<script>
import adduser from "../user/components/adduser";
import edituser from "../user/components/edituser";
import { userList, delUser, changeUser } from "@/api/user.js";
export default {
  components: {
    adduser,
    edituser
  },
  created() {
    this.list();
  },
  data() {
    return {
      userfrom: {
        username: "",
        email: "",
        role_id:''
      },
      tableData: [],
      //分页插件
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4

      //对话框
    };
  },
  methods: {
    list() {
      userList().then(res => {
        this.tableData = res.data.data.items;
      });
    },
    //新增按钮
    onSubmit() {
      this.$refs.adduser.dialogFormVisible = true;
    },
    //分页
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    //分页
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    },
    //删除按钮
    del(item) {
      delUser({
        id: item.id
      }).then(res => {
        window.console.log(res);
        window.console.log("删除成功");
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.list();
        }
      });
    },
    //状态切换
    change(item) {
      changeUser({
        id: item.id
      }).then(res => {
        window.console.log(res)
        this.list();
      });
    },
    //编辑按钮
    edituser(item){
      this.$refs.edituser.dialogFormVisible=true
      this.$refs.edituser.usereditfrom=JSON.parse(JSON.stringify(item))
      if (item.role_id==3) {
        this.$refs.edituser.usereditfrom.role_id='老师'
      }else if (item.role_id==2) {
          this.$refs.edituser.usereditfrom.role_id='管理员'
      }else if (item.role_id==4){
         this.$refs.edituser.usereditfrom.role_id='学生'
      }else if (item.role_id==1){
         this.$refs.edituser.usereditfrom.role_id='学生'
      }
      if (item.status==1) {
        this.$refs.edituser.usereditfrom.status='启用'
      }else{
         this.$refs.edituser.usereditfrom.status='禁用'
      }
      },
       //查询按钮
  search(){
   this.list(this.userfrom)
  }
     
        
      
    
  },
 
};
</script>

<style lang='less'>
.user-box {
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
  .el-form demo-ruleForm {
    margin-left: 20px;
  }
}
</style>
