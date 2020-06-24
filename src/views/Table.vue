<template>
  <div class="table">
    <public-top-bar :topBarsBtns="topBarsBtns">
      <template slot="advanced">
        <a-date-picker format="YYYY-MM-DD HH:mm:ss" />
        <a-date-picker format="YYYY-MM-DD HH:mm:ss" />
      </template>
      <template slot="panel-right">
        <a-button type="primary" @click="handleShowTree">{{
          btnName
        }}</a-button>
      </template>
    </public-top-bar>
    <a-row :gutter="15">
      <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" v-show="isShowTree">
        <h3 style="height:53px;line-height:53px;">组织架构</h3>
        <a-tree
          :tree-data="treeData"
          show-icon
          default-expand-all
          :default-selected-keys="['0-0-0']"
        >
          <a-icon slot="switcherIcon" type="down" />
          <a-icon slot="smile" type="smile-o" />
          <a-icon slot="meh" type="smile-o" />
          <template slot="custom" slot-scope="{ selected }">
            <a-icon :type="selected ? 'frown' : 'frown-o'" />
          </template>
        </a-tree>
      </a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="isShowTree ? 18 : 24"
        :xl="isShowTree ? 18 : 24"
      >
        <a-table :columns="columns" :data-source="data" :scroll="{ x: 900 }">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
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
          <span slot="action">
            <a>编辑</a>
            <a-divider type="vertical" />
            <a>删除</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">更多<a-icon type="down" /> </a>
          </span>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const treeData = [
  {
    title: "parent 1",
    key: "0-0",
    slots: {
      icon: "smile"
    },
    children: [
      { title: "leaf", key: "0-0-0", slots: { icon: "meh" } },
      { title: "leaf", key: "0-0-1", scopedSlots: { icon: "custom" } },
      { title: "leaf", key: "0-0-2", scopedSlots: { icon: "custom" } },
      { title: "leaf", key: "0-0-3", scopedSlots: { icon: "custom" } },
      { title: "leaf", key: "0-0-4", scopedSlots: { icon: "custom" } },
      { title: "leaf", key: "0-0-5", scopedSlots: { icon: "custom" } }
    ]
  }
];
const columns = [
  {
    dataIndex: "name",
    key: "name",
    width: 120,
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "Action",
    key: "action",
    width: 200,
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    gender: "男",
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    gender: "女",
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    gender: "男",
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  },
  {
    key: "4",
    name: "Joe Black",
    age: 32,
    gender: "男",
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  },
  {
    key: "5",
    name: "Joe Black",
    age: 32,
    gender: "男",
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  },
  {
    key: "6",
    name: "Joe Black",
    age: 32,
    gender: "男",
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  },
  {
    key: "7",
    name: "Joe Black",
    age: 32,
    gender: "男",
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  },
  {
    key: "8",
    name: "Joe Black",
    age: 32,
    gender: "男",
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  },
  {
    key: "9",
    name: "Joe Black",
    age: 32,
    gender: "男",
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  },
  {
    key: "10",
    name: "Joe Black",
    age: 32,
    gender: "男",
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
export default {
  name: "Table",
  data() {
    return {
      data,
      columns,
      treeData,
      isShowTree: false,
      btnName: "展示树组件",
      topBarsBtns: [
        {
          name: "新增",
          type: "primary",
          click: this.add
        },
        {
          name: "编辑",
          type: "primary",
          click: this.edit
        }
      ]
    };
  },
  methods: {
    handleShowTree() {
      this.isShowTree = !this.isShowTree;
      this.btnName = this.isShowTree ? "隐藏树组件" : "展示树组件";
    },
    add() {
      console.log("add");
      this.$router.push("/table/form");
    },
    edit() {
      console.log("edit");
    },
    onSelect(selectedKeys, info) {
      console.log("selected", selectedKeys, info);
    },
    onCheck(checkedKeys, info) {
      console.log("onCheck", checkedKeys, info);
    }
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
