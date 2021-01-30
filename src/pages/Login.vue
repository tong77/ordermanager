<template>
  <div class="login">
    <div class="login-box">
      <div class="box">
        <h1>管理系统登录</h1>
        <el-input v-model="acc" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
        <div style="margin:20px 0px"></div>
        <el-input placeholder="请输入密码" v-model="pwd" show-password prefix-icon="el-icon-lock"></el-input>
        <div style="margin:20px 0px"></div>
        <p class="err_p">{{errmsg}}</p>
        <el-button
          type="primary"
          style="color: #FFF;
                  background-color: #409EFF;
                  border-color: #409EFF;    
                  width:100%
                  "
          @click="clickLogin"
        >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { login } from "@/api/apis";

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
      this.$router.push("/main/index"); //跳转到首页
        //接口验证
        // login(this.acc, this.pwd).then((res) => {
        //   if (res.data.code == 0) {
        //     localStorage.token = res.data.token; //写入限时登录时间
        //     localStorage.role = res.data.role; //写入用户组
        //     localStorage.acc = this.acc; //存入用户名
        //     localStorage.id = res.data.id; //存入id

            
        //     this.$message({
        //       message: "用户登录成功!",
        //       type: "success",
        //     });
        //   } else this.errmsg = res.data.msg;
        // });
   
      
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background-color: #fff;
  background: url(../assets/img/bg.png);
  width: 100%;
  height: 100%;
  .login-box {
    width: 500px;
    height: 300px;
    box-sizing: border-box;
    padding: 0 50px;
    border-radius: 5px;
    box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: mymove 1s ease-in-out alternate;
    overflow: hidden;
    transition: 1.5s;
    h1 {

      text-align: center;
      font-size: 24px;
      margin-bottom: 30px;
      font-weight: bold;
      color: #606266;
    }
    .box {
      width: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
/deep/.el-input__inner {
  // background: #283443 !important;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 30px;
}
.err_p {
  line-height: 30px;
  color: rgb(250, 75, 75);
  font-size: 12px;
}
// /deep/.el-input__inner{
//       padding: 0 30px !important;
// }
</style>