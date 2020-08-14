<template>
  <div>
    <p>
      <span style="color:#606266">时间范围</span>
      <!-- 时间 -->
      <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style=";width:400px;margin:0 20px"
      size="small">
    </el-date-picker>
     <el-button type="primary" size="small">查询</el-button>
    </p>
    <div style="margin:20px 0"></div>
    <!-- 统计图 -->
     <el-row>
      <el-col :span="24">
        <div id="myChart" :style="{width: '100%', height: '400px' }"></div>
      </el-col>
    </el-row>
    <div>
        
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
             value1: '',
        }
    },
      mounted() {
    this.draw();
  },
  methods: {
    draw() {
      // 初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      var option = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["订单", "销售额", "注册人数", "管理人数"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "订单",
            type: "line",
            stack: "销售额",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "销售额",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "注册人数",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "管理人数",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320],
          },
        ],
      };
      //防止越界，重绘canvas
      window.onresize = myChart.resize;
      myChart.setOption(option); //设置option
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