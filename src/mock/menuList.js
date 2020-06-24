const list = [
  {
    key: "/home",
    title: "首页",
    select: true
  },
  {
    key: "/table",
    title: "列表",
    select: true
  },
  {
    key: "/form",
    title: "表单",
    select: true
  },
  {
    key: "/infoForm",
    title: "高级表单",
    select: true
  },
  {
    key: "/map",
    title: "百度地图",
    select: true
  },
  {
    key: "/test",
    title: "测试",
    select: true,
    children: [
      {
        key: "/test/child",
        title: "子组件",
        select: true
      },
      {
        key: "/test/child1",
        title: "子组件1",
        select: true
      },
      {
        key: "/test/child2",
        title: "公共空间管理啊啊",
        select: true
      }
    ]
  }
];

export default list;
