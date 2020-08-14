<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <div class="grid-content bg-purple-dark">
          <div class="title">
            <p>商品分类</p>
            <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
            <!-- //添加分类 -->
            <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" :label-width="formLabelWidth">
                  <el-switch v-model="form.value3" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addcatelist">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <el-table :data="tableData" style="width: 100%; margin:0 20px">
            <el-table-column prop="num" label="序号" width="100"></el-table-column>
            <el-table-column prop="cateName" label="分类名称" width="380">
              <template slot-scope="scope">
                <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
                <el-input v-model="scope.row.cateName" size="mini" v-show="scope.row.isedit"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="是否启用" width="380">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :disabled="!scope.row.isedit"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope)">{{scope.row.isedit ? '完成': '编辑'}}</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pagesize"
            layout="total,  prev, pager, next, jumper"
            :total="total"
            style=" margin:0 20px"
          ></el-pagination>
          <br />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { catelist, delcate, addcate, editcate } from "@/api/apis";
export default {
  data() {
    return {
      name: "",

      //分页器
      currentPage: 1, //当前页数
      pagesize: 5, //每页显示的条数
      total: 100, //总条数
      // isedit: false,
      tableData: [],
      // 添加分类
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        value3: true,
      },
      formLabelWidth: "100px",
    };
  },
  created() {
    this.getcatelist();
  },
  methods: {
    //分页器
    handleSizeChange(val1) {
      console.log(`每页 ${val1} 条`);
      this.pagesize = val1;
      this.getcatelist();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getcatelist();
    },
    //编辑
    handleEdit(scope) {
      if (scope.row.isedit) {
        editcate(scope.row.id, scope.row.cateName, scope.row.state).then(
          (res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "恭喜你，这是一条成功消息",
                type: "success",
              });
            }
          }
        );
        //改变数据
        scope.row.isedit = false;
      } else {
        //打开编辑状态
        scope.row.isedit = true;
      }
    },
    //获取分类
    getcatelist() {
      catelist(this.currentPage, this.pagesize).then((res) => {
        let num = 1;
        let arr = res.data.data;
        for (let obj of arr) {
          obj.num = num++;
          obj.isedit = false;
          obj.state = obj.state ? true : false;
          console.log(obj.isedit);
        }

        this.tableData = arr;
        this.total = res.data.total;
      });
    },

    //删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcate(row.id).then((res) => {
            if (res.data.code == 0) this.getcatelist();
            console.log(res);
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

    //添加分类
    addcatelist() {
      addcate(this.form.name, this.form.value3).then((res) => {
        console.log(this.form.value3);
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，添加成功",
            type: "success",
          });
          this.getcatelist();
          this.dialogFormVisible = false;
        }
      });
    },
  },
};
</script>

<style scoped lang='less'>
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

//弹框
.el-message-box__content {
  display: flex;
}
</style>