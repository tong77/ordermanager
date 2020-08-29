<template>
  <div style="background: #fff;">
    <el-col :span="24" style="background: #fff;">
      <div class="grid-content bg-purple-dark title" style="background: #fff;">
        <h1>店铺管理</h1>
        <el-button
          @click="savechange"
          type="primary"
          style="height:40px;line-height:18px"
          size="mini"
        >保存</el-button>
      </div>
      <div class="storyCon">
        <div style="margin: 20px 0;"></div>
        <p>
          店铺名称
          <el-input placeholder="店铺名称" v-model="name" clearable></el-input>
        </p>
        <div style="margin: 20px 0;"></div>
        <p>
          店铺公告
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="bulletin"
            style="width:300px;margin-left: 20px;  "
          ></el-input>
        </p>
        <div style="margin: 20px 0;"></div>
        <p>
          店铺头像
          <el-upload
            class="avatar-uploader"
            :action="UPDATE_STORE_IMG"
            :show-file-list="false"
            :on-success="headerUpdateSuc"
            style="display: inline-block;margin-left: 20px;"
          >
            <img
              style="width:146px;height:146px"
              :src="avatar == '' ? '' : GET_STORE_IMG + avatar"
              class="avatar"
            />

            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </p>
        <div style="margin: 20px 0;"></div>
        <p>
          店铺图片
          <el-upload
            :action="UPDATE_STORE_IMG"
            list-type="picture-card"
            :on-success="picUpdate"
            :on-remove="imgRemove"
            :file-list="shopimgs"
            style="display: inline-block;margin-left: 20px;"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </p>
        <div style="margin: 20px 0;"></div>
        <p>
          配送费
          <el-input placeholder="配送费" v-model="deliveryPrice" clearable style="margin-left: 34px;"></el-input>
        </p>
        <div style="margin: 20px 0;"></div>
        <p>
          配送时间
          <el-input placeholder="配送时间" v-model="deliveryTime" clearable></el-input>
        </p>
        <div style="margin: 20px 0;"></div>
        <p>
          店铺描述
          <el-input placeholder="店铺描述" v-model="description" clearable></el-input>
        </p>
        <div style="margin: 20px 0;"></div>
        <p>
          店铺评分
          <el-input placeholder="店铺评分" v-model="score" clearable></el-input>
        </p>
        <div style="margin: 20px 0;"></div>
        <p>
          销量
          <el-input placeholder="销量" v-model="sellCount" clearable style="margin-left: 44px;"></el-input>
        </p>
        <div style="margin: 20px 0;"></div>
        <p>
          活动
          <el-checkbox-group v-model="supports">
            <el-checkbox label="在线支付满25键2元" style="margin-left: 44px;"></el-checkbox>
            <el-checkbox label="果粒橙全场8折"></el-checkbox>
            <el-checkbox label="单人精彩套餐"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
          </el-checkbox-group>
        </p>
        <div style="margin: 20px 0;"></div>
        <p>
          营业时间
          <el-time-picker
            is-range
            v-model="date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            style="margin-left: 18px;"
          ></el-time-picker>
        </p>
        <div style="margin: 20px 0;"></div>
      </div>
    </el-col>
  </div>
</template>

<script>
import {
  shopinfo,
  GET_STORE_IMG,
  UPDATE_STORE_IMG,
  shopedit,
} from "@/api/apis";
import { getChaintime } from "@/utils/utils";
export default {
  data() {
    return {
      dialogVisible: false,
      // supports: false,

      deliveryPrice: "",
      deliveryTime: "",
      description: "",
      name: "",
      sellCount: "",
      bulletin: "",
      score: "",
      date: "",
      //复杂参数
      pics: [],
      avatar: "",
      supports: [],
      //回填照片墙
      shopimgs: [],
      // 上传图片
      imgUrl: "",
      imageUrl: "",
      GET_STORE_IMG: "",
      UPDATE_STORE_IMG: "",
    };
  },
  created() {
    (this.GET_STORE_IMG = GET_STORE_IMG),
      (this.UPDATE_STORE_IMG = UPDATE_STORE_IMG);
    // 获取店铺详情  数据回填
    shopinfo().then((res) => {
      // console.log(res.data.data.date);
      let arr = res.data.data;
      for (let key in arr) {
        //console.log(key); //遍历一个数组取到属性名
        this[key] = arr[key];
      }
      //照片墙回填
      this.shopimgs = this.pics.map((imgstr) => {
        return {
          name: imgstr,
          url: GET_STORE_IMG + imgstr,
        };
      });
    });
  },
  methods: {
    handlePictureCardPreview(file) {
      this.pics = file.url;
      this.dialogVisible = true;
    },
    //店铺头像上传成功
    headerUpdateSuc(res) {
      if (res.code == 0) {
        this.avatar = res.imgUrl;
        this.$message({
          type: "success",
          message: "头像上传成功！",
        });
      }
    },
    //店铺图片上传成功
    picUpdate(res) {
      if (res.code == 0) {
        this.avatar = res.imgUrl;
        this.$message({
          type: "success",
          message: "店铺图片上传成功！",
        });
      }
    },
    //删除照片墙照片
    imgRemove(res) {
      //console.log(res.name); //res.name=1590480886706.webp
      this.pics.splice(this.pics.indexOf(res.name), 1);
      // console.log(this.pics);
    },
    // 修改店铺内容

    savechange() {
      var params = {
        id: this.id,
        name: this.name,
        bulletin: this.bulletin,
        avatar: this.avatar,
        deliveryPrice: this.deliveryPrice,
        deliveryTime: this.deliveryTime,
        description: this.description,
        score: this.score,
        sellCount: this.sellCount,
        //字符串数组
        // date:this.date,
        date: JSON.stringify([
          getChaintime(this.date[0]),
          getChaintime(this.date[1]),
        ]),
        supports: JSON.stringify(this.supports),
        pics: JSON.stringify(this.pics),
      };

      // console.log(params);
      shopedit(params).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "店铺信息修改成功！",
          });
        }
      });
      console.log(this.supports);
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  text-align: left;
  line-height: 40px;
  border-bottom: 1px solid #edeff2;
  display: flex;
  justify-content: space-between;
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
  padding: 20px;
  p {
    color: #606266;
    font-size: 14px;
    padding-right: 20px;
  }
}
// 上传图片
.avatar-uploader .el-upload {
  border: 1px dashed #dcdfe6 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #dcdfe6 !important;

  font-size: 28px;
  color: #606266;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
// .avatar-uploader-icon[data-v-3e75ef26]

//输入框
.el-input {
  width: 300px;
  margin-left: 20px;
}
</style>