<template>
  <div class="table">
    <public-top-bar :topBarsBtns="topBarsBtns" @search="search">
    </public-top-bar>
    <a-row :gutter="15">
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="isShowTree ? 18 : 24"
        :xl="isShowTree ? 18 : 24"
      >
        <a-spin :delay="delayTime" :spinning="spinning">
          <a-table
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 900 }"
            rowKey="id"
            @change="change"
          >
            <a slot="server" slot-scope="text">{{ text }}</a>
            <span slot="customTitle"><a-icon type="smile-o" /> 服务人员</span>
            <span slot="tags" slot-scope="tags">
              <a-tag
                v-for="tag in tags"
                :key="tag"
                :color="
                  tag === 'loser'
                    ? 'volcano'
                    : tag.length > 5
                    ? 'geekblue'
                    : 'green'
                "
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
            <span slot="action" slot-scope="scope">
              <!-- <a @click="add(scope.id)">编辑</a>
              <a-divider type="vertical" /> -->
              <a @click="detele(scope.id)">删除</a>
            </span>
          </a-table>
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: "server",
    width: 120,
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "server" }
  },
  {
    title: "服务商名称",
    dataIndex: "serviceProvider"
  },
  {
    title: "报告日期",
    dataIndex: "reportDate"
  },
  {
    title: "客户名称",
    dataIndex: "name"
  },
  {
    title: "客户电话",
    dataIndex: "phone"
  },
  {
    title: "检查项目",
    dataIndex: "inspectionItem"
  },
  {
    title: "操作",
    key: "action",
    fixed: "right",
    scopedSlots: { customRender: "action" }
  }
];
import reportService from "@/services/report.service.js";
import { message } from "ant-design-vue";
export default {
  name: "Table",
  data() {
    return {
      pagination: {
        pageNumber: 1,
        pageSize: 10
      },
      spinning: false,
      delayTime: 500,
      searchVal: {
        userName: ""
      },
      creatTime: "",
      data: [],
      columns,
      isShowTree: false,
      // topBarsBtns: [
      //   {
      //     name: "新增",
      //     type: "primary",
      //     click: this.add
      //   }
      // ]
    };
  },
  methods: {
    change(pagination) {
      let { current, pageSize } = pagination;
      this.pagination.pageNumber = current;
      this.pagination.pageSize = pageSize;
      this.getlist();
    },
    search(val) {
      this.searchVal.userName = val;
      this.getlist();
    },
    async getlist() {
      this.spinning = true;
      let res = await reportService.getlistByPage({
        userName: this.searchVal.userName,
        pageNumber: this.pagination.pageNumber,
        pageSize: this.pagination.pageSize
      });
      this.spinning = false;
      this.data = res.content;
    },
    async detele(id) {
      let res = await reportService.report(id, "DELETE");
      if (res) {
        message.success("删除成功");
        this.getlist();
      }
    },
    add(id) {
      if (id) {
        this.$router.push(`/report/form?id=${id}`);
      } else {
        this.$router.push(`/report/form`);
      }
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>

<style lang="less" scoped>
.table {
  /deep/ .ant-pagination {
    margin-right: 16px;
  }
}
</style>
