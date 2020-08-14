<template>
  <div class="login">
    <div class="login-box">
      <h1>系统登录</h1>
      <el-input v-model="acc" placeholder="请输入账号" prefix-icon="el-icon-user-solid" size="mini"></el-input>
      <div style="margin:20px 0px"></div>
      <el-input
        placeholder="请输入密码"
        v-model="pwd"
        show-password
        prefix-icon="el-icon-lock"
        size="mini"
      ></el-input>
      <div style="margin:20px 0px"></div>
      <p class="err_p">{{errmsg}}</p>
      <el-button type="primary" style="width:100%" size="mini" @click="clickLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/apis";

export default {
  data() {
    return {
      acc: "",
      pwd: "",
      errmsg: "",
    };
  },
  methods: {
    clickLogin() {
      //接口验证
      login(this.acc, this.pwd).then((res) => {
        if (res.data.code == 0) {

          localStorage.token=res.data.token //写入限时登录时间
          localStorage.role = res.data.role //写入用户组
          console.log(res);
          localStorage.acc=this.acc  //存入用户名
          localStorage.id=res.data.id  //存入id

          this.$router.push("/main/index"); //跳转到首页
          this.$message({
            message: "用户登录成功!",
            type: "success",
          });
        } else this.errmsg = res.data.msg;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background: #2d3a4b;
  width: 100%;
  height: 100%;
  .login-box {
    width: 350px;
    height: 300px;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    h1 {
      color: #fff;
      font-size: 14px;
      text-align: center;
      line-height: 100px;
    }
  }
}
/deep/.el-input__inner {
  background: #283443 !important;
}
.err_p {
  
  line-height: 30px;
  color: rgb(250, 75, 75);
  font-size: 12px;
}
</style>