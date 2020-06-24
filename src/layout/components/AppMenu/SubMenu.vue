<template functional>
  <a-sub-menu :key="props.menuInfo.key" v-if="props.menuInfo.select">
    <span slot="title">
      <div class="item-box">
        <img :src="props.menuInfo.icon" alt="" /><span>{{
          props.menuInfo.title
        }}</span>
      </div>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item :key="item.key" class="menu-item" v-if="item.select">
        <div>{{ item.title }}</div>
      </a-menu-item>
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ["menuInfo"]
};
</script>
<style lang="less">
.ant-menu-submenu-title {
  text-align: left;
  height: 50px;
  line-height: 50px;
  font-size: 14px !important;
  .item-box {
    line-height: 40px;
    display: flex;
    align-items: center;
    img {
      height: 14px;
      width: 14px;
      margin-right: 8px;
    }
  }
}
</style>
