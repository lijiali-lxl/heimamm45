<template>
  <div>
    <el-card class="heard-card">
      <ul class="circle-box">
        <li class="circle-item circle-item1">
          <div class="circle-data">{{datainfro.increment_users}}</div>
          <span class="circle-text">今日新增用户</span>
        </li>
        <li class="circle-item circle-item2">
          <div class="circle-data">{{datainfro.total_users}}</div>
          <span class="circle-text">总用户量</span>
        </li>
        <li class="circle-item circle-item3">
          <div class="circle-data">{{datainfro.increment_questions}}</div>
          <span class="circle-text">新增试题</span>
        </li>
        <li class="circle-item circle-item4">
          <div class="circle-data">{{datainfro.total_questions}}</div>
          <span class="circle-text">总试题量</span>
        </li>
        <li class="circle-item circle-item5">
          <div class="circle-data">{{datainfro.total_done_questions}}</div>
          <span class="circle-text">总刷题量</span>
        </li>
        <li class="circle-item circle-item6">
          <div class="circle-data">{{datainfro.personal_questions}}</div>
          <span class="circle-text">人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <el-card class="foot">
      <div id="main" style="width: 100%;height:571px;" ref="main"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import {getChart,entChart} from '@/api/chart.js'
export default {
    data() {
        return {
            datainfro:{}
        }
    },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(this.$refs.main);
    // 使用刚指定的配置项和数据显示图表。
    const option = {
      title: {
        text: "整体数据",
        textStyle: {
          color: "#235894"
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: 1400,
        data: ["黑马", "阿里", "京东"]
      },
       color : [ 'rgba(247, 97, 55)', 'rgba(249, 179, 88)', 'rgba(64, 158, 255)' ],
      series: [
        {
          name: "黑马",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: "黑马" },
            { value: 310, name: "阿里" },
            { value: 234, name: "京东" }
          ]
        }
      ]
    };
    myChart.setOption(option);
  },
  //获取数据列表
 created() {
    getChart().then(res=>{
        window.console.log(res)
        this.datainfro=res.data
        window.console.log(this.datainfro)


        //调用企业数据接口
       entChart().then(res=>{
           window.console.log(res)
           window.console.log('企业数据')
       })
    })
    
 },
};
</script>

<style>
/* .el-card__body {
  height: 149px;
} */
.circle-box {
  display: inline;
  margin-left: 30px;
}
.circle-item {
  width: 110px;
  height: 110px;
  display: inline-block;
  border-radius: 110px;
  border: 2px solid #0086fa;
  margin-right: 150px;
  text-align: center;
}
.circle-data {
  margin-top: 35px;
  /* margin-left: 40px; */
  margin-bottom: 50px;
  font-size: 26px;
  font-weight: bolder;
}
.circle-text {
  margin-left: 10px;
}
.circle-item1 > .circle-data,
.circle-item2 > .circle-data {
  color: #0086fa;
}
.circle-item3 > .circle-data,
.circle-item4 > .circle-data {
  color: #f76137;
}
.circle-item3,
.circle-item4 {
  border: 2px solid #f76137;
}

.circle-item5 > .circle-data,
.circle-item6 > .circle-data {
  color: #55cd78;
}
.circle-item5,
.circle-item6 {
  border: 2px solid #55cd78;
}
.foot {
  height: 571px;
  margin-top: 30px;
}
</style>