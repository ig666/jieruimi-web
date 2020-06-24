<template>
  <div class="nav-bar-container">
    <a-row :gutter="15"></a-row>
    <a-col :xs="4" :md="12" :lg="12" :xl="12">
      <div class="left-panel">
        <a-icon
          v-show="device === 'desktop'"
          @click="handleCollapse"
          :type="collapse ? 'menu-unfold' : 'menu-fold'"
          style="font-size:20px;font-weight:bold;margin-right:10px;cursor:pointer;"
        />
        <breadcrumb v-show="device === 'desktop'"></breadcrumb>
      </div>
    </a-col>
    <a-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="right-panel">
        <global-search
          v-show="device === 'desktop'"
          style="margin-right:15px;"
        ></global-search>
        <full-screen style="margin-right:15px;" @reload="reload"></full-screen>
        <a-icon
          class="right-panel-reload"
          type="sync"
          :spin="spining"
          @click="reload"
        />
        <a-dropdown>
          <span style="cursor:pointer;">
            <a-avatar
              size="large"
              style="margin-right:10px;"
              src="https://chu1204505056.gitee.io/vue-admin-beautiful/static/img/user.20010688.gif"
            ></a-avatar>
            <span>admin</span>
            <a-icon type="down" />
          </span>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">注销</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">个人信息</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-col>
  </div>
</template>

<script>
import GlobalSearch from "../GlobalSearch";
import Breadcrumb from "../Breadcrumb";
import FullScreen from "../FullScreen";
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  components: {
    GlobalSearch,
    Breadcrumb,
    FullScreen
  },
  data() {
    return {
      spining: false
    };
  },
  computed: {
    ...mapGetters("common", ["collapse", "device"])
  },
  methods: {
    // 展开-收起菜单
    handleCollapse() {
      this.$store.dispatch("common/toggleCollapse");
      if (this.device === "desktop") {
        this.reload();
      }
    },
    // 重载页面
    reload() {
      this.spining = true;
      this.$store.dispatch("common/handleReload", false);
      this.$nextTick(() => {
        this.$store.dispatch("common/handleReload", true);
      });
      setTimeout(() => {
        this.spining = false;
      }, 800);
    }
  }
};
</script>

<style lang="less" scoped>
.nav-bar-container {
  z-index: 1;
  padding: 0 20px;
  position: relative;
  height: 50px;
  overflow: visible;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: 50px;
    min-height: 50px;
  }
  .right-panel {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-end;
    height: 50px;
    .right-panel-reload {
      font-size: 20px;
      cursor: pointer;
      margin-right: 15px;
    }
  }
}
</style>
