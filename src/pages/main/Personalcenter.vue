<template>
  <div style="background:#fff;padding:20px">
    <p>管理员信息</p>
    <el-divider></el-divider>
    <p>
      管理员ID：
      <span>{{id}}</span>
    </p>
    <el-divider></el-divider>
    <p>
      账号：
      <span>{{account}}</span>
    </p>
    <el-divider></el-divider>
    <p>
      用户组：
      <span>{{userGroup}}</span>
    </p>
    <el-divider></el-divider>
    <p>
      创建时间：
      <span>{{ctime}}</span>
    </p>
    <el-divider></el-divider>
    <div style="display:flex;align-items: center;">
      <p>管理员头像：</p>
      <el-upload
        action="http://127.0.0.1:5000/users/avatar_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :data="uploaddata"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { accountinfo } from "@/api/apis";

import { getChaintime } from "@/utils/utils";
export default {
  data() {
    return {
      updataid: "",
      id: "",
      account: "",
      userGroup: "",
      ctime: "",
      uploaddata: "",
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      console.log(111, res);
      if (res.code == 0) {
        this.$message({
          message: "恭喜你，头像修改成功",
          type: "success",
        });
        //将头像状态通过bus传递给main.vue文件
        this.$bus.$emit("headerupdate");
      }
    },
    infolist() {
      accountinfo(localStorage.id).then((res) => {
        this.id = res.data.accountInfo.id;
        this.account = res.data.accountInfo.account;
        this.userGroup =
          res.data.accountInfo.userGroup == "选项一"
            ? (res.data.accountInfo.userGroup = "超级管理者")
            : (res.data.accountInfo.userGroup = "普通管理者");
        this.ctime = getChaintime(res.data.accountInfo.ctime);
        this.updataid = res.data.accountInfo.id;
      });
    },
  },
  created() {
    this.infolist();
    this.uploaddata = { id: localStorage.id };
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
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
</style>