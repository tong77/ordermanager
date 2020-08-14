import Vue from 'vue'
import App from './App.vue'
import router from './router'

//ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


// echarts统计图
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 


Vue.config.productionTip = false

//组件间传值
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
