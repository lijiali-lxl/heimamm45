<template>
  <div class="user-box">
    <!-- 饿了吗的卡片 -->
    <!-- 头部 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="userfrom" class="demo-form-inline" ref='userfrom'>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="userfrom.username"></el-input>
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
          <el-button @click="clearuser">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onSubmit">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 内容 -->
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%" border >
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色">
          <template slot-scope="scope">
            <span v-if="scope.row.role_id==2">管理员</span>
            <span v-else-if="scope.row.role_id==3">老师</span>
            <span v-else-if="scope.row.role_id==1">超级管理员</span>
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
        <el-table-column fixed="right" label="操作" width="120" v-if="['超级管理员'].includes($store.state.role)==true">
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
        :current-page="page"
        :page-sizes="pagesizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 使用adduser会话框 -->
    <adduser ref="adduser"></adduser>
    <!-- 编辑会话框 -->
    <edituser ref="edituser"></edituser>
  </div>
</template>

<script>
//新增组件
import adduser from "../user/components/adduser";
//编辑组件
import edituser from "../user/components/edituser";
//导入路由
import { userList, delUser, changeUser } from "@/api/user.js";

export default {
  //注册组件
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
        role_id: ""
      },
      tableData: [],
      //分页
      page: 1,
      pagesizes: [2, 4, 6, 8],
      size: 2,
      total: 0

      //对话框
    };
  },
  methods: {
    list() {
      userList({
        page: this.page,
        limit: this.size,
        ...this.userfrom
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.items;
        this.total = res.data.pagination.total;
      });
    },
    //新增按钮
    onSubmit() {
      this.$refs.adduser.dialogFormVisible = true;
    },
    //分页点击的容量
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
      this.size = val;
      this.page = 1;
      this.list();
    },
    //分页点击的页码
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
      this.page = val;
      this.list();
    },
    //删除按钮
    del(item) {
      delUser({
        id: item.id
      }).then(res => {
        window.console.log(res);
        window.console.log("删除成功");
        if (res.code == 200) {
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
        window.console.log(res);
        this.list();
      });
    },
    //编辑按钮
    edituser(item) {
      this.$refs.edituser.dialogFormVisible = true;
      this.$refs.edituser.usereditfrom = JSON.parse(JSON.stringify(item));

    },
    //查询按钮
    search() {
      this.page=1
      userList({
        page: this.page,
        limit: this.size,
        ...this.userfrom
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.items;
        
        this.total = res.data.pagination.total;
    
       
      });
      
    },
    //点击清除按钮
  clearuser(){
    this.$refs.userfrom.resetFields()
    this.page=1
    this.list()
  }
  }
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
