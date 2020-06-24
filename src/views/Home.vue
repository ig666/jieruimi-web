<template>
  <div class="home">
    <a-row :gutter="15">
      <a-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="6"
        :xl="6"
        v-for="item in 5"
        :key="item"
      >
        <a-card
          hoverable
          :loading="loading"
          :class="[item === 5 ? 'card' : '']"
        >
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            style="width:100%;height:200px;margin-bottom:15px;"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon key="setting" type="setting" />
            <a-icon key="edit" type="edit" />
            <a-icon key="ellipsis" type="ellipsis" />
          </template>
          <a-card-meta title="Card title" description="This is the description">
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <a-card title="数量" hoverable :loading="loading" class="card">
          <ve-histogram
            :data="chartData"
            :extend="barExtends"
            :settings="barSettings"
          ></ve-histogram>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <a-card title="数量" hoverable :loading="loading" class="card">
          <ve-histogram
            :data="chartData"
            :extend="barExtends"
            :settings="barSettings"
          ></ve-histogram>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { VeHistogram } from "v-charts";
export default {
  name: "Home",
  components: {
    VeHistogram
  },
  mounted() {
    this.chartData.rows = [
      { key: "1", value: 22 },
      { key: "2", value: 122 },
      { key: "3", value: 222 },
      { key: "4", value: 122 },
      { key: "5", value: 232 },
      { key: "6", value: 252 },
      { key: "7", value: 102 },
      { key: "8", value: 82 },
      { key: "9", value: 92 },
      { key: "10", value: 32 },
      { key: "11", value: 272 }
    ];
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 800);
  },
  data() {
    return {
      loading: false,
      chartData: {
        columns: ["key", "value"],
        rows: []
      },
      barExtends: {
        grid: {
          top: 10,
          bottom: 0,
          left: 0,
          right: 0
        },
        yAxis: {
          axisLabel: {
            show: true
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              opacity: 0.2,
              width: 1.5
            }
          }
        },
        legend: {
          show: false
        },
        series: {
          symbol: "none",
          barWidth: "32px",
          areaStyle: {
            opacity: 1
          }
        },
        tooltip: {
          triggerOn: "mousemove"
        },
        color: "#59C4FF"
      },
      barSettings: {
        metrics: ["value"],
        dimension: ["key"],
        labelMap: {
          value: "次数"
        }
      }
    };
  }
};
</script>

<style lang="less" scoped></style>
