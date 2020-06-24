# 基础响应式人脸识别管理系统

> 前端 2.0 版本 (基于 Vue.js 2.x 版本)

## Feature

- [x] 首页
- [x] 列表
- [x] 表单
- [x] 百度地图

## Technology Stack

- [Vue.js](https://cn.vuejs.org)
- [Vue-Router](https://router.vuejs.org/zh/)
- [Vuex](https://vuex.vuejs.org/zh/)
- [Ant Design Vue](https://www.antdv.com/docs/vue/introduce-cn/)
- [webpack](https://webpack.js.org/)
- [axios](https://github.com/axios/axios)
- [less](http://lesscss.org/)
- [yarn](https://yarnpkg.com/zh-Hans/)
- [echarts](https://echarts.apache.org/zh/index.html)
- [v-charts](https://v-charts.js.org/#/)
  > 以上框架具体版本请参照 package.json

## 安装说明

- 安装依赖请使用 yarn 而不是 npm
- 后台接口请在 vue.config.js 配置

## Build Setup

```bash
# install dependencies
yarn

# run project in development mode
yarn serve

# build for production
yarn run build
```

## Directory Description

```shell
  # 挂载文件目录
  |- public
  # 打包文件
  |- /dist
  # 项目配置文件
  |- /config
  # 主要代码目录
  |- /src
    # 项目静态资源存放目录
    |- /assets
    # 通用组件目录(该目录下的组件已全局注册，不用再局部引用)
    |- /components
      # 列表顶部同意封装组件
      |- /PublicTopBar
    # 项目布局组件
    |- /layout
    # 项目模拟数据存放目录
    |- mock
    # 第三方js插件引用目录
    |- plugins
    # 路由目录(该目录下的路由已全局注册,不用再局部引用)
    |- /router
    # api目录
    |- /services
    # 数据管理目录
    |- /store
    # 全局样式目录
    |- /styles
    # 工具目录
    |- /utils
    # 页面目录
    |- /views
      # 首页
      |- /home
      # 列表
      |- /table
      # 表单
      |- form
      # 高级表单
      |- inForm
      # 百度地图
      |- map
    # babel配置文件
    |- .babelrc
    # 编辑器配置文件
    |- .editorconfig
    # ESLint 忽略文件
    |- .eslintignore
    # ESLint 配置文件
    |- .eslintrc.js
    # git忽略文件
    |- .gitignore
    # 依赖注册文件
    |- package.json
    # 说明文件
    |- README.md
    # 版本锁文件
    |- yarn.lock
```
