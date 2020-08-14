<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <div class="title" style="margin:0  20px">
          <p>商品添加</p>
        </div>
        <div style="margin: 20px 0;"></div>
        <div class="con">
          <p>
            商品名称
            <el-input v-model="name" placeholder="商品名称" size="mini"></el-input>
          </p>
          <div style="margin: 20px 0;"></div>
          <p>
            商品分类
            <el-select v-model="category" placeholder="请选择" size="mini">
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
            <el-input v-model="price" placeholder="商品价格" size="mini"></el-input>
          </p>
          <div style="margin: 20px 0;"></div>
          <p style="display:flex">
            <span>商品图片</span>
            <el-upload
              :action="UPDATE_GOODS_IMG"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="imageUrl"
                :src="GET_GOODS_IMG+this.imageUrl"
                class="avatar"
                style="height:100px;width=100px"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </p>
          <div style="margin: 20px 0;"></div>
          <p>
            商品描述
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="goodsDesc"></el-input>
          </p>
          <div style="margin: 20px 0;"></div>
          <el-button type="primary" size="small" @click="addgoods">添加商品</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { categories, add ,UPDATE_GOODS_IMG,GET_GOODS_IMG} from "@/api/apis";
export default {
  data() {
    return {
      num: 1,
      imageUrl: "",
      options: [],

      //商品描述
      goodsDesc: "",
      name: "",
      price: "",
      //商品分类
      category: "",
      UPDATE_GOODS_IMG:'',
      GET_GOODS_IMG:'',
    };
  },
  created() {
    this.UPDATE_GOODS_IMG=UPDATE_GOODS_IMG
    this.GET_GOODS_IMG=GET_GOODS_IMG
    //商品分类
    categories().then((res) => {   
      let arr = res.data.categories;
      this.options = arr;
      //select默认为第一个值
      this.category=arr[0].cateName
      
    });
  },
  methods: {
    //图片地址
    handleAvatarSuccess(res) {
      // console.log(res.imgUrl);
      this.imageUrl = res.imgUrl;
    },
    //商品添加
    addgoods() {
      // console.log(this.goodsDesc);

      add(
        this.name,
        this.category,
        this.price,
        this.imageUrl,
        this.goodsDesc
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，添加商品成功",
            type: "success",
          });
        }
        this.name = "";
        this.category = "";
        this.price = "";
        this.imageUrl = "";
        this.goodsDesc = "";
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
  padding: 0 0px;
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
.el-button {
  margin-left: 120px;
  margin-bottom: 100px;
}
.el-select {
  margin-left: 20px;
}
</style>