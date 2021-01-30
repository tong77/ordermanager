//引入核心库
import vue from 'vue';
//引入vue-router
import vueRouter from 'vue-router'
//引入checktoken接口
// import {checktoken} from '@/api/apis'


//在当前vue项目中使用路由切换
vue.use(vueRouter)

//引入要切换的页面
import Login from './pages/Login'


//创建新对象 
var router = new vueRouter({
     // mode: 'history',  //history 历史模式   hash HASH模式 性能更高
  base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
           
        },
        {
            path: '/main',
            name: 'main',
            component: ()=>import('./pages/Main'),
            children: [
                // 首页
                {
                path: '/main/index',
                name: '/main/Index',
                component: () => import('./pages/main/Index'),
                meta:{breaklist:['首页']}
            },
            {
                path: '/main/order',
                name: '/main/Order',
                component: ()=>import('./pages/main/Order'),
                meta:{breaklist:['商品管理']}
            },
            // {
            //     path: '/main/store',
            //     name: '/main/Store',
            //     component: ()=>import('./pages/main/Store'),
            //     meta:{breaklist:['店铺管理']}
            // },
            // 商品管理
            // {
            //     path: '/main/classify',
            //     name: '/main/product/classify',
            //     component: ()=>import('./pages/main/product/Classify'),
            //     meta:{breaklist:['商品管理','商品分类 ']}
            // },
            // {
            //     path: '/main/add',
            //     name: '/main/product/add',
            //     component: ()=>import('./pages/main/product/Add'),
            //     meta:{breaklist:['商品管理','商品增加']}
            // },
            // {
            //     path: '/main/list',
            //     name: '/main/product/list',
            //     component: ()=>import('./pages/main/product/List'),
            //     meta:{breaklist:['商品管理','商品列表']}
            // },
            // {
            //     path: '/main/store',
            //     name: '/main/Store',
            //     component: ()=>import('./pages/main/Store'),
            //     meta:{breaklist:['店铺管理']}
            // },
            // 商品上传
            {
                path: '/main/heroupload',
                name: '/main/upload/heroupload',
                component: ()=>import('./pages/main/upload/Heroupload'),
                meta:{breaklist:['资源上传','英雄列表上传']}
            },
            {
                path: '/main/picupload',
                name: '/main/upload/picupload',
                component: ()=>import('./pages/main/upload/Picupload'),
                meta:{breaklist:['资源上传','图片列表上传']}
            },
            // 账号管理
            {
                path: '/main/listacc',
                name: '/main/Listacc',
                component: ()=>import('./pages/main/account/Listacc'),
                meta:{breaklist:['账号管理','账号列表']}
            },
            {
                path: '/main/changeacc',
                name: '/main/product/changeacc',
                component: ()=>import('./pages/main/account/Changeacc'),
                meta:{breaklist:['账号管理','修改密码']}
            },
            {
                path: '/main/addacc',
                name: '/main/Addacc',
                component: ()=>import('./pages/main/account/Addacc'),
                meta:{breaklist:['账号管理','账号增加']}
            },

         
            //订单统计
            // {
            //     path: '/main/goods',
            //     name: '/main/product/goods',
            //     component: ()=>import('./pages/main/sales/Goods'),
            //     meta:{breaklist:['销售统计','商品统计']}
            // },
            // {
            //     path: '/main/salesorder',
            //     name: '/main/order',
            //     component: ()=>import('./pages/main/sales/Order'),
            //     meta:{breaklist:['销售统计','订单统计']}
            // },
            //个人中心
            {
                path: '/main/personal',
                name: '/main/personal',
                component: ()=>import('./pages/main/Personalcenter')
            },
            ]
        },

    ]
})


// router.beforeEach((to, from, next) => {
//   //to是跳转到哪里
//   //from是来自哪里
//   //next是放行
   
//   //先判断是否在登陆页面，在的话就放行，不在就判断是否登录，登录就放行，没登陆就跳转到登录页面
//   if(to.path !='/'){
//       //不在登陆页面
//       checktoken(localStorage.token).then(res=>{
//             if(res.data.code==0){
//                 //登陆状态
//                 next()
//             }else{
//                 next('/') //放行到登陆页面
//             }
//       })
//   }else{
//       //在登录页面
//       next()
//   }
    
// })

//进行暴露
export default router
