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
        path: "/table",
        name: "Table",
        component: () => import("@/views/Table.vue")
      },
      {
        path: "/table/form",
        name: "TableAddForm",
        component: () => import("@/views/Add.vue")
      },
      {
        path: "/form",
        name: "Form",
        component: () => import("@/views/Form.vue")
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
