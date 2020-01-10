<template>
  <div class="enterprise-box">
    <!-- 头卡 -->
    <el-card class="heard-card">
      <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline" >
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="removeent">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="addenter">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="conter-card">
      <!-- 表格内容 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="250" type="index"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="250"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="250"></el-table-column>
        <el-table-column prop="username" label="创建者" width="250"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="250"></el-table-column>
        <el-table-column prop="status" label="状态" width="250">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column user label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="editent(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="statusClick(scope.row)"
            >{{scope.row.status==1?'禁用':'启用'}}</el-button>
            <el-button type="text" size="small" @click="delent(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pagesizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pageChange"
        background
      ></el-pagination>
    </el-card>
    <!-- 使用组件 -->
    <addenterprise ref="addenterprise"></addenterprise>
    <editent ref="editent"></editent>
  </div>
</template>

<script>
//导入新增会话框组件
import addenterprise from "../enterprise/components/addenterprise";
import editent from "../enterprise/components/editenterprise";
//导入路由接口
import { entList, entStatus, entRemove } from "@/api/enterprise.js";
export default {
  //注册组件
  components: {
    addenterprise,
    editent
  },
  //获取用户列表
  created() {
    this.getList();
  },
  data() {
    return {
      //头部表单
      formInline: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      //表格
      tableData: [],

      //分页内容
      page: 1,
      pagesizes: [2, 4, 6, 8],
      size: 2,
      total: 2
    };
  },
  methods: {
    //点击容量的改变
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
      this.size = val;
      this.getList();
    },
    //点解页码
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
      this.page=val;
      this.getList()
    },
    //点击新增按钮
    addenter() {
      this.$refs.addenterprise.dialogFormVisible = true;
    },
    //封装列表方法
    getList() {
      entList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.items;
        this.total = res.data.pagination.total;
      });
    },
    //点击编辑按钮
    editent(items) {
      this.$refs.editent.dialogFormVisible = true;
      window.console.log(items);
      this.$refs.editent.editentForm = JSON.parse(JSON.stringify(items));
    },
    //状态编辑
    statusClick(items) {
      entStatus(items).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          this.getList();
        }
      });
    },
    //点击删除按钮
    delent(items) {
      this.$confirm("你确定要删除嘛", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          entRemove(items).then(res => {
            window.console.log(res);
            if (res.code == 200) {
              this.$message.success("删除成功");
              if (this.tableData.length==1) {
                this.page--;
                if (this.page==0) {
                  this.page=1
                }
                
              }
               this.getList();
             
            }
          });
        })
        .catch(() => {});
    },
    //查询企业信息
    search() {
      this.page=1
      this.getList();
    },
    //点击清除按钮
    removeent(){
     
      // this.$refs.formInline.resetFields()
      this.$refs.formInline.resetFields();
    
      this.getList()
    }
  }
};
</script>

<style lang='less'>
.enterprise-box {
  .conter-card {
    margin-top: 20px;
  }
  .pageChange {
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
  .red {
    color: red;
  }
}
</style>

