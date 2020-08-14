<template>
  <div style="height:100%">
    <el-container style="dispaly:flex;height:100%">
      <!-- 左侧菜单 -->
      <el-aside width="200px" style>
        <div class="aside">
          <h5 style="font-weight:normal;text-align: center;height:50px;line-height: 50px;">
            <svg
              style="margin-top:10px"
              t="1596553781683"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2479"
              width="30"
              height="30"
            >
              <path
                d="M458.524444 189.62963c121.173333 21.048889 108.468148 135.016296 66.180741 170.666666 89.694815 18.962963 110.743704 29.202963 185.837037 81.730371s93.677037 132.740741 98.607408 200.248889a407.134815 407.134815 0 0 1 0 92.16l151.703703-17.066667v-83.247408L909.084444 587.851852l-40.58074-109.985185-117.76-134.068148L628.811852 265.481481l-34.133333-82.678518s-136.154074-33.185185-136.154075 6.826667z"
                fill="#00aaff"
                p-id="2480"
              />
              <path
                d="M919.324444 768.568889h-815.407407a92.539259 92.539259 0 0 1-91.211852-92.34963 93.297778 93.297778 0 0 1 7.395556-36.788148 91.591111 91.591111 0 0 1 18.962963-29.392592 94.814815 94.814815 0 0 1 29.202963-18.962963 91.401481 91.401481 0 0 1 11.567407-4.171852 442.595556 442.595556 0 0 1 282.548148-328.628148 146.014815 146.014815 0 0 1 43.235556-98.986667A144.497778 144.497778 0 0 1 512 115.484444a146.583704 146.583704 0 0 1 106.761481 43.804445A144.877037 144.877037 0 0 1 663.703704 258.654815 442.595556 442.595556 0 0 1 943.597037 585.955556a93.297778 93.297778 0 0 1 40.77037 155.496296 89.884444 89.884444 0 0 1-65.042963 27.117037z m-815.407407-117.57037a21.048889 21.048889 0 0 0-8.533333 1.896296 26.358519 26.358519 0 0 0-8.154074 5.309629 23.703704 23.703704 0 0 0-4.930371 7.774815 25.78963 25.78963 0 0 0-2.085926 10.42963 22.376296 22.376296 0 0 0 7.205926 17.066667 21.807407 21.807407 0 0 0 16.497778 7.016296h815.407407a21.617778 21.617778 0 0 0 16.497778-7.016296 25.220741 25.220741 0 0 0 0-35.081482 21.617778 21.617778 0 0 0-16.687407-7.205926h-34.702222l-4.171852-29.392592a373.57037 373.57037 0 0 0-263.016297-306.251852L587.851852 307.01037l4.740741-29.771851s1.517037-8.722963 1.706666-12.515556a77.937778 77.937778 0 0 0-24.082963-56.888889A79.454815 79.454815 0 0 0 512 183.751111a77.558519 77.558519 0 0 0-56.888889 23.703704A79.644444 79.644444 0 0 0 430.459259 265.481481v13.653334l2.465185 27.875555-26.927407 7.964445A373.57037 373.57037 0 0 0 143.739259 621.605926l-4.171852 29.392593z"
                fill="#00aaff"
                p-id="2481"
              />
              <path
                d="M12.894815 837.214815m35.65037 0l927.099259 0q35.65037 0 35.650371 35.65037l0 0.18963q0 35.65037-35.650371 35.65037l-927.099259 0q-35.65037 0-35.65037-35.65037l0-0.18963q0-35.65037 35.65037-35.65037Z"
                fill="#00aaff"
                p-id="2482"
              />
              <path
                d="M284.444444 621.985185a34.702222 34.702222 0 0 1-7.205925 0 34.133333 34.133333 0 0 1-26.168889-40.580741c11.757037-54.802963 65.232593-161.564444 183.94074-172.752592a34.133333 34.133333 0 0 1 6.447408 67.887407c-82.10963 7.774815-117.001481 88.557037-123.638519 119.087408A34.133333 34.133333 0 0 1 284.444444 621.985185z"
                fill="#00aaff"
                p-id="2483"
              />
            </svg>
            外卖商家中心
          </h5>
          <el-menu
            default-active="curpath"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#0af"
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
              <p @click="perclick" class="percen">个人中心</p>
              <img :src="headerimgUrl" class="headPhoto" />
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
import { checktoken, accountinfo } from "@/api/apis";
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
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/main/qq",
          icon: "el-icon-goods",
          name: "商品管理",
          roles: ["super", "normal"],
          children: [
            { url: "/main/list", name: "商品列表" },
            { url: "/main/add", name: "商品添加" },
            { url: "/main/classify", name: "商品分类" },
          ],
        },
        {
          url: "/main/store",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super", "normal"],
        },
        {
          url: "/main/oee",
          icon: "el-icon-user",
          name: "账号管理",
          roles: ["super","normal"],
          children: [
            { url: "/main/listacc", name: "账号列表" },
            { url: "/main/addacc", name: "添加账号" },
            { url: "/main/changeacc", name: "修改密码" },
          ],
        },
        {
          url: "/main/ttt",
          icon: "el-icon-edit",
          name: "销售统计",
          roles: ["super","normal"],
          children: [
            { url: "/main/goods", name: "商品统计" },
            { url: "/main/salesorder", name: "订单统计" },
          ],
        },
      ],
    };
  },
  methods: {
    perclick() {
      this.$router.push("/main/personal"); //跳转到个人中心
    },
    //获取个人信息
    replayinfo() {
      accountinfo(localStorage.id).then((res) => {
        // console.log(res.data.accountInfo.imgUrl);
        // 头像添加
        this.headerimgUrl = res.data.accountInfo.imgUrl;
      });
    },
  },

  // computed: {
  //   //权限数组
  //   powerarr() {
  //     let newarr = this.list.filter((item) => {
  //       return item.roles.includes(localStorage.role);
  //     });
  //     return newarr;
  //   },
  // },
  created() {
    //头像修改及时更新
    this.$bus.$on("headerupdate", () => {
      this.replayinfo();
    });
    //点击导航时的样式状态保持
    this.curpath = this.$route.path;
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.acc = localStorage.acc;
      } else {
        this.acc = "请登录";
      }
    });
    this.replayinfo();
  },
  watch: {
    $route() {
      // console.log(to.meta.breaklist);
      this.breaklist = this.$route.meta.breaklist;
    },
  },
  computed: {
    //权限数组
    powerarr() {
      // 根据用户权限进行运算，返回运算完毕的数组
      let newarr = this.list.filter((item) => {
        //返回包含此用户权限的数据
        return item.roles.includes(localStorage.role);
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

.el-aside {
  background-color: #304156;
  color: #fff;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-menu {
  flex: 1;
}
.el-row {
  display: flex;
}
.headPhoto {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-menu {
  border: 0;
}
a {
  color: #fff !important;
  text-decoration: none;
}
.el-menu-item.is-active a {
  color: #0af !important;
}
.percen {
  cursor: pointer;
  margin-left: 20px;
}
</style>