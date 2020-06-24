import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const asyncRoutes = [
  {
    path: "*",
    name: "404",
    component: () => import("@/views/404.vue")
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/401.vue")
  },
  /** Layout */
  {
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home.vue")
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/user/User.vue")
      },
      {
        path: "/user/form",
        name: "TableAddForm",
        component: () => import("@/views/user/Form.vue")
      },
      {
        path: "/report",
        name: "Report",
        component: () => import("@/views/report/Report.vue")
      },
      {
        path: "/report/form",
        name: "ReportForm",
        component: () => import("@/views/report/Form.vue")
      },
      {
        path: "/infoForm",
        name: "InfoForm",
        component: () => import("@/views/InfoForm.vue")
      },
      {
        path: "/map",
        name: "Map",
        component: () => import("@/views/Map.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: asyncRoutes
});

export default router;
