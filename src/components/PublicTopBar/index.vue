<template>
  <div class="public-top-bar">
    <a-row>
      <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" class="panel-left">
        <a-input-search
          class="search"
          placeholder="输入用户名搜索"
          style="width: 200px"
          @search="onSearch"
        />
        <div
          class="btn-group"
          v-for="(item, idx) in topBarsBtns"
          :key="item.name"
        >
          <a-button
            class="btn"
            :type="idx === 0 ? 'primary' : null"
            @click="item.click && item.click()"
            >{{ item.name }}</a-button
          >
        </div>
        <!-- <a-button class="btn" @click="isAdvancedSearch = !isAdvancedSearch"
          >高级搜索</a-button
        > -->
      </a-col>
      <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="panel-right">
        <slot name="panel-right"></slot>
      </a-col>
    </a-row>
    <!-- <a-row v-if="isAdvancedSearch" style="padding:12px 0 14px">
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        class="advanced-panel"
      >
        <slot name="advanced"></slot>
        <a-button type="primary">查询</a-button>
      </a-col>
    </a-row> -->
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "PublicTopBar",
  props: {
    topBarsBtns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      moment,
      // 是否显示高级搜索
      isAdvancedSearch: false
    };
  },
  methods: {
    // 搜索
    onSearch(v) {
      this.$emit("search", v);
    }
  }
};
</script>

<style lang="less">
.advanced-panel {
  & > span {
    margin-right: 24px;
    margin-bottom: 10px;
    min-width: 200px;
  }
  & > div {
    margin-right: 24px;
    margin-bottom: 10px;
    min-width: 200px;
  }
  & > input {
    margin-right: 24px;
    margin-bottom: 10px;
    min-width: 200px;
  }
}
</style>

<style lang="less" scoped>
.public-top-bar {
  width: 100%;
  margin-bottom: 14px;
  .panel-left {
    .btn-group {
      display: inline-block;
    }
    .btn {
      margin-right: 24px;
      margin-bottom: 10px;
    }
    .search {
      margin-right: 24px;
      margin-bottom: 10px;
    }
  }
  .panel-right {
    text-align: right;
    .btn {
      margin-bottom: 10px;
    }
  }
  .ant-btn {
    width: 88px;
  }
}
</style>
