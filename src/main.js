import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
