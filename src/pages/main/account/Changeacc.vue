<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <div class="title">
          <p>修改密码</p>
        </div>
        <div class="con">
          <p>
            <span>原密码</span>
            <el-input v-model="oldpwd" placeholder="请输入原密码" size="small " show-password></el-input>
            <span class="err_span">{{errmsg}}</span>
          </p>
          <div style="margin: 20px 0;"></div>
          <p>
            <span>新密码</span>
            <el-input v-model="newpwd" placeholder="请输入新密码" size="small " show-password></el-input>
            <span class="new_span">{{errnew}}</span>
          </p>
          <div style="margin: 20px 0;"></div>
          <p>
            <span>确认密码</span>
            <el-input v-model="surepwd" placeholder="请再次新密码" size="small " show-password></el-input>
          </p>
          <div style="margin: 20px 0;"></div>
          <el-button type="primary" size="small " @click="changepwd">修改</el-button>
          <el-button size="small ">重置</el-button>
          <div style="margin: 20px 0;"></div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { editpwd } from "@/api/apis";
import { checkoldpwd } from "@/api/apis";

export default {
  data() {
    return {
      oldpwd: "",
      newpwd: "",
      surepwd: "",
      errmsg: "",
      errnew:'',
    };
  },
  methods: {
    changepwd() {
      checkoldpwd(this.oldpwd, localStorage.id).then((res) => {
        if (res.data.code == 1) {
          this.errmsg = res.data.msg;
        } else if (this.oldpwd == this.newpwd){
          this.errnew='新密码不能和旧密码一样'
        }else if(res.data.code == 0  ) {
          editpwd(this.newpwd, localStorage.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "密码修改成功，请重新登陆!",
                type: "success",
              });
              setTimeout(function(){
                location.href='/'
              },2000)
            }
          });
        }
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
.con {
  padding: 20px 60px;
}
.el-input {
  display: inline-block;
  width: 300px;
  margin-left: 20px;
}

p {
  display: flex;
  span {
    display: inline-block;
    text-align: right;
    width: 50px;
  }
}
.err_span,.new_span {
  display: inline-block;
  width: 146px;
  color: red;
  font-size: 12px;
  line-height: 40px;
}
</style>