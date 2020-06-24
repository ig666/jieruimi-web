import router from "@/router";
const defaultCachedRoute = {
  key: "/home",
  title: "首页",
  name: "Home"
};
const state = {
  cachedRoutes: [defaultCachedRoute.name],
  tagsBar: [defaultCachedRoute]
};

const getters = {
  cachedRoutes: state => state.cachedRoutes,
  tagsBar: state => state.tagsBar
};

const actions = {
  // 获取缓存路由name
  getCachedNames({ commit }) {
    commit("GET_CACHED_NAMES");
  },
  // 添加缓存路由
  addCachedRoute({ commit }, data) {
    commit("ADD_CACHED_ROUTE", data);
  },
  // 删除缓存路由
  deleteCachedRoute({ commit }, data) {
    commit("DELETE_CACHED_ROUTE", data);
  },
  // 关闭所有缓存路由
  closeAll({ commit }, that) {
    commit("CLOSE_ALL", that);
  },
  // 关闭其他缓存路由
  closeOthers({ commit }, data) {
    commit("CLOSE_OTHERS", data);
  },
  // 关闭左侧缓存路由
  closeLeft({ commit }, data) {
    commit("CLOSE_LEFT", data);
  },
  closeRight({ commit }, data) {
    commit("CLOSE_RIGHT", data);
  }
};

const mutations = {
  GET_CACHED_NAMES(state) {
    state.cachedRoutes = state.tagsBar.map(v => v.name);
  },
  ADD_CACHED_ROUTE(state, data) {
    const isCached = state.tagsBar.some(e => e.key === data.key);
    if (isCached) {
      return;
    }
    state.tagsBar.push(data);
    let cachedNames = state.tagsBar.map(item => item.name);
    state.cachedRoutes = cachedNames;
  },
  DELETE_CACHED_ROUTE(state, data) {
    const { that, key } = data;
    let delName = null;
    state.tagsBar = state.tagsBar.filter((item, idx) => {
      if (item.key === key) {
        delName = item.name;
      }
      if (item.key === key) {
        if (that.$route.path === key) {
          router.push(state.tagsBar[idx - 1].key);
        }
      }
      return item.key !== key;
    });
    state.cachedRoutes = state.cachedRoutes.filter(item => item !== delName);
  },
  CLOSE_ALL(state, that) {
    that.$router.push("/home");
    state.tagsBar = [defaultCachedRoute];
    that.$store.dispatch("tagsBar/getCachedNames");
  },
  CLOSE_OTHERS(state, { that, key }) {
    const current = state.tagsBar.filter(v => v.key === key);
    state.tagsBar =
      defaultCachedRoute.key === key
        ? [defaultCachedRoute]
        : [defaultCachedRoute].concat(current);
    that.$store.dispatch("tagsBar/getCachedNames");
  },
  CLOSE_LEFT(state, { that, key }) {
    if (state.tagsBar.length > 1) {
      const cachedList = state.tagsBar.slice(
        state.tagsBar.findIndex(v => v.key === key)
      );
      state.tagsBar = [defaultCachedRoute].concat(cachedList);
      that.$store.dispatch("tagsBar/getCachedNames");
    }
  },
  CLOSE_RIGHT(state, { that, key }) {
    if (state.tagsBar.length > 1) {
      const cachedList = state.tagsBar.slice(
        0,
        state.tagsBar.findIndex(v => v.key === key) + 1
      );
      state.tagsBar = cachedList;
      that.$store.dispatch("tagsBar/getCachedNames");
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
