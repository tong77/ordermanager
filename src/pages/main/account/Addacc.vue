<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <div class="title">
          <p>添加账号</p>
        </div>
        <div class="con">
          <p>
            <span>账号</span>
            <el-input v-model="acc" placeholder="请输入账号" size="small "></el-input>
          </p>
          <div style="margin: 20px 0;"></div>
          <p>
            <span>密码</span>
            <el-input v-model="pwd" placeholder="请输入密码" size="small " show-password></el-input>
          </p>
          <div style="margin: 20px 0;"></div>
          <p>
            <span>用户组</span>
            <el-select v-model="value" placeholder="请选择" size="small ">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </p>
          <div style="margin: 20px 0;"></div>
          <el-button type="primary" size="small " @click="addclick">添加</el-button>
          <el-button size="small " @click="reclick">重置</el-button>
          <div style="margin: 20px 0;"></div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { adduser } from "@/api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      option: [
        {
          value: "超级管理员",
          label: "超级管理员",
        },
        {
          value: "普通管理员",
          label: "普通管理员",
        },
      ],
      value: "",
    };
  },
  methods: {
    addclick() {
      adduser(this.acc, this.pwd, this.value).then((res) => {
       if(res.code==0){
          this.$message({
          message: '恭喜你，添加成功',
          type: 'success'
        });
       }
      });
      this.acc = "";
      this.pwd = "";
    },
    reclick() {
      this.acc = "";
      this.pwd = "";
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
.el-select {
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
</style>