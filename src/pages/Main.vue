<template>
  <div style="height:100%">
    <el-container style="dispaly:flex;height:100%">
      <!-- 左侧菜单 -->
      <el-aside width="200px" >
        <div class="aside">
          <p
            style="text-align: center;height:100px;line-height:80px; diaplay:flex;  align-items: center;"
          >
            <img @click="perclick" :src="headerimgUrl" class="headPhoto himg" />
            <!-- <img style="width:80px; margin-top:20px" src="../assets/img/3.png" alt=""> -->
            <!-- <span class="tit">外卖商家中心</span> -->
          </p>
          <el-menu
            default-active="curpath"
            background-color="#fff"
            text-color="#333"
            active-text-color="#333"
            style="height:100%;flex:1;"
            router
            unique-opened
          >
            <div v-for="item in powerarr" :key="item.url">
              <el-menu-item :index="item.url" v-if="!item.children">
                <i :class="item.icon"></i>
                <span slot="title">
                  <router-link to>{{item.name}}</router-link>
                </span>
              </el-menu-item>

              <el-submenu :index="item.url" v-else>
                <!-- 大标题 -->
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </template>
                <!-- 小标题 -->
                <el-menu-item v-for="child in item.children" :key="child.url" :index="child.url">
                  <router-link to>{{child.name}}</router-link>
                </el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <!-- 头部 -->

        <el-header>
          <div class="header" style="display:flex; justify-content: space-between;">
            <p>
              <el-breadcrumb style="line-height: 60px;">
                <el-breadcrumb-item v-for="item in  breaklist " :key="item">{{item}}</el-breadcrumb-item>
              </el-breadcrumb>
            </p>
            <div style="display:flex; ">
              <p>欢迎你，{{acc}}</p>
              <img @click="perclick" :src="headerimgUrl" class="headPhoto percen" />
              <p @click="exit"  style="margin-left:20px">退出</p>
            </div>
          </div>
        </el-header>
        <!-- 二级页面 -->
        <el-main style="flex:1">
          <div class="con">
            <!-- 引入路由显示 -->
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { checktoken, accountinfo } from "@/api/apis";
export default {
  data() {
    return {
      breaklist: [],
      headerimgUrl: "",
      curpath: "",
      input: "",
      acc: "",

      list: [
        {
          url: "/main/index",
          icon: "el-icon-menu",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/order",
          icon: "el-icon-s-order",
          name: "商品管理",
          roles: ["super", "normal"],
        },
        // {
        //   url: "/main/qq",
        //   icon: "el-icon-goods",
        //   name: "商品管理",
        //   roles: ["super", "normal"],
        //   children: [
        //     { url: "/main/list", name: "商品列表" },
        //     { url: "/main/add", name: "商品添加" },
        //     { url: "/main/classify", name: "商品分类" },
        //   ],
        // },
        // {
        //   url: "/main/store",
        //   icon: "el-icon-s-shop",
        //   name: "店铺管理",
        //   roles: ["super", "normal"],
        // },
          {
          url: "/main/upload",
          icon: "el-icon-document-add",
          name: "资源上传",
          roles: ["super", "normal"],
          children: [
            { url: "/main/heroupload", name: "英雄列表上传" },
            { url: "/main/picupload", name: "图片列表上传" },
          ],
        },
        {
          url: "/main/oee",
          icon: "el-icon-user",
          name: "账号管理",
          roles: ["super", "normal"],
          children: [
            { url: "/main/listacc", name: "账号列表" },
            { url: "/main/addacc", name: "添加账号" },
            { url: "/main/changeacc", name: "修改密码" },
          ],
        },
      
        // {
        //   url: "/main/ttt",
        //   icon: "el-icon-edit",
        //   name: "销售统计",
        //   roles: ["super", "normal"],
        //   children: [
        //     { url: "/main/goods", name: "商品统计" },
        //     { url: "/main/salesorder", name: "订单统计" },
        //   ],
        // },
      ],
    };
  },
  methods: {
    perclick() {
      this.$router.push("/main/personal"); //跳转到个人中心
    },
    //获取个人信息
    replayinfo() {
      // accountinfo(localStorage.id).then((res) => {
      //   // 头像添加
      //   this.headerimgUrl = res.data.accountInfo.imgUrl;
      //   localStorage.header=res.data.accountInfo.imgUrl
      // });
    },
    exit() {
      this.$router.push("/"); //跳转到登录页面
      localStorage.token = ""; //写入限时登录时间
      localStorage.role = ""; //写入用户组F
      localStorage.acc = ""; //存入用户名
      localStorage.id = ""; //存入id
    },
  },
  created() {
    //头像修改及时更新
    this.$bus.$on("headerupdate", () => {
      this.replayinfo();
    });
    //点击导航时的样式状态保持
    this.curpath = this.$route.path;
    // checktoken(localStorage.token).then((res) => {
    //   if (res.data.code == 0) {
    //     this.acc = localStorage.acc;
    //   } else {
    //     this.acc = "请登录";
    //   }
    // });
    this.replayinfo();
  },
  watch: {
    $route() {
      // console.log(to.meta.breaklist);
      this.breaklist = this.$route.meta.breaklist;
    },
  },
  // 数据计算用computed
  computed: {
    //权限数组
    powerarr() {
      // 根据用户权限进行运算，返回运算完毕的数组
      let newarr = this.list.filter((item) => {
        //返回包含此用户权限的数据
        return item.roles
        ;
      });

      return newarr;

      // es6
      // return this.list.filter(item => item.roles.includes(localStorage.role))
    },
  },
};
</script>

<style lang="less" scoped>
/* 布局样式 */
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;

}
/deep/.el-menu-item{
  margin:0 20px;
  border-radius:4px
}
/deep/.el-submenu__title{
  margin:0 20px;
  border-radius:4px
}
.el-aside {
  background-color: #fff;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-container {
  background-color: #e9eef3;
}
.el-menu {
  flex: 1;
  border: 0;
}
.el-row {
  display: flex;
}
.headPhoto {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
a {
  color: #333 !important;
  text-decoration: none;
}
.el-menu-item.is-active a {
  color: #0af !important;
}
.percen {
  cursor: pointer;
  margin-left: 20px;
}
.himg {
  margin-top: 20px;
}
.tit {
  display: inline-block;
  line-height: 30px;
}
</style>