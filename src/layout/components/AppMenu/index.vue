<template>
  <div>
    <a-menu
      mode="inline"
      theme="dark"
      :inline-collapsed="collapse"
      class="menu"
      :selectedKeys="[$route.path]"
      @select="clickMenu"
      :openKeys="openKeys"
      @openChange="onOpenChange"
    >
      <template v-for="item in menuList">
        <a-menu-item
          v-if="!item.children && item.select"
          :key="item.key"
          class="menu-item"
        >
          <div class="item-box">
            <a-icon type="user" /><span>{{ item.title }}</span>
          </div>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.key" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SubMenu from "./SubMenu";
export default {
  name: "AppMenu",
  components: {
    SubMenu
  },
  mounted() {
    this.getDefautOpenKey();
    this.$store.dispatch("common/getMenuList", {
      that: this,
      cb: () => {
        this.pushCurrentToTags(this.$route.path);
      }
    });
  },
  data() {
    return {
      collapse: false,
      openKeys: []
    };
  },
  computed: {
    ...mapGetters("common", ["menuList"]),
    rootSubmenuKeys() {
      let keys = this.menuList.map(item => {
        if (item.children && item.children.length > 0) {
          return item.key;
        }
      });
      return keys;
    }
  },
  methods: {
    // 刷新页面展开选中菜单
    getDefautOpenKey() {
      let path;
      let paths = this.$route.path.split("/");
      if (paths.length >= 3) {
        path = paths[paths.length - 2];
      }
      this.openKeys = ["/" + path];
    },
    // 将当前菜单添加至tagsView
    pushCurrentToTags(key) {
      const item = this.getCurrenItem(key);
      const name = this.getRouteName(key);
      if (item && name) {
        delete item.select;
        this.$store.dispatch("tagsBar/addCachedRoute", { ...item, name });
      }
    },
    // 菜单点击
    clickMenu({ key }) {
      const item = this.getCurrenItem(key);
      delete item.select;
      const name = this.getRouteName(key);
      this.$store.dispatch("tagsBar/addCachedRoute", { ...item, name });
      this.$router.push(key);
    },
    // 获取当前选择菜单路由名称
    getRouteName(path) {
      const pathList = path
        .split("/")
        .filter(v => v)
        .map(v => v.slice(0, 1).toUpperCase() + v.slice(1));
      console.log(pathList);
      return pathList.join("");
    },
    // 获取当前选择菜单item
    getCurrenItem(key) {
      const menuList = JSON.parse(JSON.stringify(this.menuList));
      let res = null;
      for (let item of menuList) {
        if (item.key === key) {
          res = item;
          return res;
        }
        if (item.children) {
          for (let item1 of item.children) {
            if (item1.key === key) {
              res = item;
              return res;
            }
          }
        }
      }
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
