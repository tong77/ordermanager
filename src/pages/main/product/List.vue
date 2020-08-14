<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <div class="title">
          <p>商品列表</p>
        </div>
        <div style="margin:20px 0"></div>

        <el-table v-loading="loading" :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <img :src="GET_GOODS_IMG+props.row.imgUrl" class="goodsimg" />
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>
                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
          <el-table-column prop="category" label="所属分类" width="180"></el-table-column>
          <el-table-column prop="price" label="商品价格" width="180"></el-table-column>
          <el-table-column label="商品图片" width="180">
            <template slot-scope="scope">
              <img :src="GET_GOODS_IMG+scope.row.imgUrl" class="goodsimg" />
            </template>
          </el-table-column>
          <el-table-column prop="goodsDesc" label="商品描述" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <!-- 编辑弹窗 -->
              <el-dialog title="商品编辑" :visible.sync="dialogFormVisible">
                <div class="con">
                  <p>
                    商品名称
                    <el-input v-model="returndata.name" placeholder="商品名称" size="mini"></el-input>
                  </p>
                  <div style="margin: 20px 0;"></div>
                  <p>
                    商品分类
                    <el-select v-model="returndata.category" placeholder="请选择" size="mini">
                      <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :cateName="item.cateName"
                        :value="item.cateName"
                      ></el-option>
                    </el-select>
                  </p>
                  <div style="margin: 20px 0;"></div>
                  <p>
                    商品价格
                    <el-input v-model="returndata.price" placeholder="商品价格" size="mini"></el-input>
                  </p>
                  <div style="margin: 20px 0;"></div>
                  <p style="display:flex">
                    <span>商品图片</span>
                    <el-upload
                      :action="UPDATE_GOODS_IMG"
                      :show-file-list="false"
                      :on-success="uploadfinish"
                    >
                      <img
                        v-if="!returndata.imageUrl"
                        :src="GET_GOODS_IMG+returndata.imgUrl"
                        class="avatar"
                        style="height:100px;width:100px"
                      />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </p>
                  <div style="margin: 20px 0;"></div>
                  <p style="display:flex">
                    <span>商品描述</span>
                    <el-input
                      type="textarea"
                      :rows="2"
                      v-model="returndata.goodsDesc"
                      placeholder="请输入商品描述"
                      style="width:200px;margin-left:20px"
                    ></el-input>
                  </p>
                  <div style="margin: 20px 0;"></div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="aditsure">确 定</el-button>
                </div>
              </el-dialog>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { list, del, GET_GOODS_IMG ,edit,categories,UPDATE_GOODS_IMG} from "@/api/apis";
import { getChaintime } from "@/utils/utils";

export default {
  data() {
    return {
      //分页器
      total: 100, //总条数
      pagesize: 5, //每页显示条数
      currentPage: 1, //当前页
      tableData: [],

      imgUrl: "",

      dialogFormVisible: false,
      // 回执数据
      returndata:[],
      //获取分类
      options:[],
      //缓冲加载
      loading: true,

      //获取图片地址
      GET_GOODS_IMG: "",
      UPDATE_GOODS_IMG:'',
    };
  },
  created() {
    this.getgoodslist();
    this.GET_GOODS_IMG = GET_GOODS_IMG;
    this.UPDATE_GOODS_IMG=UPDATE_GOODS_IMG
  },
  methods: {
  
    // 编辑商品
    handleEdit(index, row) {
      //点击编辑显示编辑弹窗
      this.dialogFormVisible = true;
      //获取商品分类
      categories().then(res=>{
        this.options=res.data.categories
      })
      //数据回执
      this.returndata={...row}
      //
      } ,
    
     //图片上传成功回调
    uploadfinish(res) {
      if (res.code == 0) {
        this.returndata.imgUrl = res.imgUrl;
      }
    },
    aditsure(){
      //发送请求，修改编辑数据
      edit(this.returndata).then(res=>{
          if(res.data.code==0){
            this.$message({
            type: "success",
            message: "商品数据修改成功!",
          });
            this.dialogFormVisible = false
            this.getgoodslist()
          }
      }) 
    },
    
    //获取商品列表
    getgoodslist() {
      this.loading = true;
      list(this.currentPage, this.pagesize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = getChaintime(obj.ctime);
          console.log(this.imgUrl);
        }

        this.tableData = res.data.data;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    // 分页器
    //点击切换条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //改变页面条数
      this.pagesize = val;
      //进行页面更新
      this.getgoodslist();
    },
    //点击页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //改变当前页数
      this.currentPage = val;
      //进行页面更新
      this.getgoodslist();
    },

    //删除商品
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del(row.id).then((res) => {
            if (res.data.code == 0) this.getgoodslist();
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
  },
};
</script>

<style lang="less" scoped>
@base: #dcdfe6;
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.goodsimg {
  width: 50px;
  height: 50px;
}
.con {
  margin: 0 40px;
  p {
    display: inline-block;
    color: #606266;
    font-size: 14px;
    .el-input {
      display: inline-block;
      width: 300px;
      margin-left: 20px;
    }
  }

  .el-input-number {
    margin-left: 20px;
  }
  /deep/.el-upload {
    margin: 0 22px;
    width: 100px;
    height: 100px;
    border: 1px dashed #ccc;
    line-height: 100px;
  }
  .el-select {
    margin-left: 20px;
  }
}
</style>