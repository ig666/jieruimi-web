import menuList from "@/mock/menuList";
const state = {
  device: "desktop",
  // 控制菜单展开
  collapse: false,
  // 路由重载
  isRouterAlive: true,
  // 滚动条减去宽度
  scrollWidth: 360,
  menuList: []
};

const getters = {
  device: state => state.device,
  collapse: state => state.collapse,
  menuList: state => state.menuList,
  isRouterAlive: state => state.isRouterAlive,
  scrollWidth: state => state.scrollWidth
};

const actions = {
  // 切换设备
  toggleDevice({ commit }, data) {
    commit("TOGGLE_DEVICE", data);
  },
  // 切换left menu
  toggleCollapse({ commit }) {
    commit("TOGGLE_COLLAPSE");
  },
  // 获取菜单列表
  async getMenuList({ commit }, data) {
    const { that, cb } = data;
    const res = await new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve(menuList);
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
    that.$message.success("获取菜单成功");
    commit("GET_MENU_LIST", res);
    cb && cb();
  },
  // 路由重载
  handleReload({ commit }, data) {
    commit("HANDLE_RELOAD", data);
  },
  // 修改滚动条减去宽度
  changeScrollWidth({ commit }, width) {
    commit("CHANGE_SCROLL_WIDTH", width);
  }
};

const mutations = {
  TOGGLE_DEVICE(state, data) {
    state.device = data;
  },
  TOGGLE_COLLAPSE(state) {
    state.collapse = !state.collapse;
  },
  GET_MENU_LIST(state, data) {
    state.menuList = data;
  },
  HANDLE_RELOAD(state, data) {
    state.isRouterAlive = data;
  },
  CHANGE_SCROLL_WIDTH(state, width) {
    state.scrollWidth = width;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
