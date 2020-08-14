<template>
  <div>
    <p>
      <span style="color:#606266">时间范围</span>
      <!-- 时间 -->
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style=";width:400px;margin:0 20px"
        size="small"
      ></el-date-picker>
      <el-button @click="gettime" type="primary" size="small">查询</el-button>
    </p>
    <div style="margin:20px 0"></div>
    <!-- 统计图 -->
    <el-row>
      <el-col :span="24">
        <div id="myChart" :style="{width: '100%', height: '400px' }"></div>
      </el-col>
    </el-row>
    <div></div>
  </div>
</template>

<script>
import { ordertota } from "@/api/apis";
import { getChaintime } from "@/utils/utils";
export default {
  data() {
    return {
      date: [],
    };
  },
  //统计图
  mounted() {
    this.draw();
  },
  methods: {
    gettime() {
      let timestr = JSON.stringify([
        getChaintime(this.date[0]),
        getChaintime(this.date[1]),
      ]);
      this.draw(timestr);
    },
    
    draw(str) {
      // 初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      ordertota(str).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getChaintime(obj.orderTime);
        }
        // 绘制图表
         let option = {
          xAxis: {
            type: "category",
            data: arr.map(obj => obj.orderTime)
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: arr.map(obj => obj.orderAmount),
              type: "bar"
            }
          ]
        };

        this.sechart.setOption(option);
        //防止越界，重绘canvas
        window.onresize = myChart.resize;
        myChart.setOption(option); //设置option
      });
    },
  },
};
</script>

<style lang="less" scoped>
#myChart {
  background: #fff;
  padding: 20px;
}
</style>