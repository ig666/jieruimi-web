<template>
  <a-breadcrumb class="breadcrumb" separator=">">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.key">
      <a v-if="breadList.length !== index + 1" :href="item.key">{{
        item.title
      }}</a>
      <span v-else>{{ item.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Breadcrumb",
  mounted() {
    setTimeout(() => {
      this.getCurrenBread(this.$route.path);
    }, 1000);
  },
  data() {
    return {
      breadList: []
    };
  },
  computed: {
    ...mapGetters("common", ["menuList"])
  },
  watch: {
    "$route.path"(path) {
      this.getCurrenBread(path);
    }
  },
  methods: {
    // 获取当前面包屑
    getCurrenBread(path) {
      path = path || "";
      let paths = path.split("/");
      let breadList = [];
      if (paths.includes("form")) {
        path = paths.slice(0, paths.length - 1).join("/");
        let flag = !!Object.keys(this.$route.query).length;
        if (flag) {
          breadList.push({
            key: path,
            title: "编辑"
          });
        } else {
          breadList.push({
            key: path,
            title: "新增"
          });
        }
      }
      for (let item of this.menuList) {
        if (item.key === path) {
          breadList.unshift({
            path: item.key,
            title: item.title
          });
          break;
        }
        if (item.children) {
          for (let item1 of item.children) {
            if (item1.key === path) {
              breadList.unshift(
                {
                  path: item.key,
                  title: item.title
                },
                {
                  path: item1.key,
                  title: item1.title
                }
              );
              break;
            }
          }
        }
      }
      this.breadList = breadList;
    }
  }
};
</script>

<style lang="less"></style>
