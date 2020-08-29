<template>
  <div>
    <p>
      <span style="color:#606266">时间范围</span>
      <!-- 时间 -->
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
      ></el-date-picker>
      <el-button type="primary" size="small" @click="clickSearch">查询</el-button>
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
      date: ["2019-06-04 00:00:00", "2020-07-25 00:00:00"],
    };
  },
  mounted() {
    this.sechart = this.$echarts.init(document.getElementById("myChart"));
  },
  methods: {
    clickSearch() {
      let timestr = JSON.stringify([
        getChaintime(this.date[0]),
        getChaintime(this.date[1]),
      ]);
      console.log(111, timestr);
      ordertota(timestr).then((res) => {
        // res.data.data 所有订单数据
        //res.data.data.orderTime下单时间 x轴
        //res.data.data.orderAmount订单金额  数据
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getChaintime(obj.orderTime);
        }
        let option = {
          xAxis: {
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arr.map((obj) => obj.orderAmount),
              type: "bar",
            },
          ],
        };

        this.sechart.setOption(option);
      });
    },
  },
  created () {
    this.date=["2019-06-04 00:00:00", "2020-07-25 00:00:00"]
  }
};
</script>

<style lang="less" scoped>
#myChart {
  background: #fff;
  padding: 20px;
}
</style>