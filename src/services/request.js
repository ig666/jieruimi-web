import axios from "axios";
import { message } from "ant-design-vue";
import NProgress from "nprogress";
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
axios.interceptors.request.use(
  config => {
    // return config
    NProgress.start();
    config.headers.Authorization =
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTMwMjkyNzksInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsibnVsbCIsIlJPTEVfVVNFUiJdLCJqdGkiOiIzMDc1M2VmMy1jZDU3LTQwODctOGVhOC01YWE0NWE1MzhlOTEiLCJjbGllbnRfaWQiOiJjbGllbnQiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.AdHFafGAAJu-l6ltRIavXreLByUAK3I-QnTSEjx9GSw";
    // if (window.localStorage.getItem("token")) {
    //   if (config.url !== "/upload") {
    //     config.headers.Authorization = window.localStorage.getItem("token");
    //   }
    // } else {
    //   router.replace("/login");
    // }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
axios.interceptors.response.use(
  response => {
    NProgress.done();
    return response.data;
  },
  error => {
    if (error.response.status === 401) {
      message.warning("Unauthorized");
    } else if (error.response.status === 403) {
      message.warning("Forbidden");
      return;
    } else if (error.response.status === 500) {
      message.warning(error.response.data.message);
    }
    // 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes("timeout")) {
        message.error("请求超时，请检查网络是否连接正常");
      } else {
        message.error("请求失败，请检查网络是否已连接");
      }
      return;
    }
    return Promise.reject(error);
  }
);

export function handleService(url, data, method = "GET") {
  if (method === "GET") {
    if (data) {
      Object.keys(data).forEach(key => {
        if (data[key] === "") {
          data[key] = undefined;
        }
      });
    }
    return axios({
      url: url,
      params: data,
      method: method
    });
  } else {
    return axios({
      url: url,
      data: data,
      method: method
    });
  }
}
