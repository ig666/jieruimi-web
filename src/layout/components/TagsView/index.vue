<template>
  <div class="tags-view">
    <div class="left-group">
      <a-icon style="margin-right:10px;cursor:pointer;" type="double-left" />
      <transition-group
        name="list"
        tag="p"
        class="scroll-view"
        :style="{ width: `calc(100vw - ${scrollWidth}px)` }"
      >
        <a-tag
          :color="activeKey === item.key ? '#5862CB' : null"
          v-for="(item, idx) in tagsBar"
          :key="item.key"
          :closable="idx !== 0"
          @click="handleItemClick(item)"
          @close="handleItemClose($event, item)"
        >
          {{ item.title }}
        </a-tag>
      </transition-group>
    </div>
    <div class="right-group">
      <a-icon style="margin-right:10px;cursor:pointer;" type="double-right" />
      <a-dropdown>
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          更多操作 <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="handleCloseOthers">
              <a-icon type="close-circle" />
              关闭其他</a
            >
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="handleCloseLeft">
              <a-icon type="left-circle" />
              关闭左侧</a
            >
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="handleCloseRight">
              <a-icon type="right-circle" />
              关闭右侧</a
            >
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="handleCloseAll">
              <a-icon type="stop" />
              全部关闭</a
            >
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TagsView",
  data() {
    return {
      checked1: false,
      activeKey: this.$route.path
    };
  },
  computed: {
    ...mapGetters("tagsBar", ["tagsBar"]),
    ...mapGetters("common", ["scrollWidth"])
  },
  watch: {
    "$route.path"(v) {
      this.activeKey = v;
    }
  },
  methods: {
    // 点击tag
    handleItemClick({ key }) {
      if (key === this.activeKey) {
        return;
      }
      this.$router.push(key);
    },
    // 关闭tag
    handleItemClose(e, { key }) {
      e.preventDefault();
      this.$store.dispatch("tagsBar/deleteCachedRoute", { that: this, key });
    },
    // 关闭全部
    handleCloseAll() {
      this.$store.dispatch("tagsBar/closeAll", this);
    },
    // 关闭其他
    handleCloseOthers() {
      this.$store.dispatch("tagsBar/closeOthers", {
        that: this,
        key: this.activeKey
      });
    },
    // 关闭左侧
    handleCloseLeft() {
      this.$store.dispatch("tagsBar/closeLeft", {
        that: this,
        key: this.activeKey
      });
    },
    // 关闭右侧
    handleCloseRight() {
      this.$store.dispatch("tagsBar/closeRight", {
        that: this,
        key: this.activeKey
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tags-view {
  height: 50px;
  width: 100%;
  background-color: #fff;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-group {
    display: flex;
    align-items: center;
    .scroll-view {
      height: 50px;
      margin-bottom: 0;
      overflow-y: hidden;
      overflow-x: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-radius: 10px;
      &::-webkit-scrollbar {
        height: 3px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;
    }
    .list-enter-active,
    .list-leave-active {
      transition: all 1s cubic-bezier(0.11, 0.76, 0.81, 0.27);
    }
    .list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(25px);
    }
    .ant-tag {
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      padding: 1.5px 8px;
    }
  }
  .right-group {
    height: 50px;
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}
</style>
