<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <div class="title">
          <p>账号列表</p>
        </div>
        <div class="con">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="account" label="账号" width="150"></el-table-column>
            <el-table-column prop="userGroup" label="用户组" width="150"></el-table-column>
            <el-table-column label="创建时间" width="150">
              <template slot-scope="scope">{{ scope.row.ctime }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total='total'
          ></el-pagination>
          <div style="margin: 10px 0;"></div>
          <el-button type="danger" size="small" @click="batchdelete">批量删除</el-button>
          <el-button @click="toggleSelection()" type="primary" size="small">取消选择</el-button>
          <div style="margin: 20px 0;"></div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { userlist, deluser, editueser, delallusers } from "@/api/apis";
import { getChaintime } from "@/utils/utils";
export default {
  data() {
    return {
      tableData: [],

      //分页器
      total:100, //总条数
      pagesize:5, //每页显示条数
      currentPage: 1, //当前页

      multipleSelection: [],
    };
  },
  created() {
    this.getuserlist();
    
  },

  methods: {
// 分页器
    //点击切换条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //改变页面条数
      this.pagesize=val
      //进行页面更新
      this.getuserlist()
    },
    //点击页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //改变当前页数
      this.currentPage=val
      //进行页面更新
      this.getuserlist()
    },
    //获取用户列表
    getuserlist() {
      userlist(this.currentPage,this.pagesize ).then((res) => { 
        let arr = res.data.data;
        for(let i=0;i<arr.length;i++){
          arr[i].ctime=getChaintime(arr[i].ctime)
        }
        //总条数
        this.total=res.data.total;
        //当页数据
        this.tableData = arr;
      });
    },
     //删除按钮
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          deluser(row.id).then(() => {});
          this.getuserlist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //取消删除
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //复选款
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map((item) => {
        return item.id;
      });
      console.log(this.ids);
    },
    //批量删除
    batchdelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delallusers(JSON.stringify(this.ids)).then((res) => {
            if (res.data.code == 0) {
              this.getuserlist();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑 修改列表
    handleEdit(index, row) {
      editueser(row.id, row.account, row.userGroup).then((res) => {
        console.log(res);
      });
    },

   

  },
};
</script>

<style lang="less" scoped>
@base: #dcdfe6;
.cell {
  font-weight: normal;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  background: #fff;
  height: 100%;
}
.title {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid @base;
  padding: 0 20px;
}
.el-col {
  background: #fff;
}
.el-table {
  margin: 10px 0;
}
.con {
  padding: 0 20px;
}
// .el-table th{
//     font-weight: normal!important;
// }
// .el-button {
//   margin: 0 20px;
// }
</style>