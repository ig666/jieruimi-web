import axios from "axios";
import { message } from "ant-design-vue";
import NProgress from "nprogress";

const request = axios.create({
  timeout: 15000
});
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
request.interceptors.request.use(
    config => {
      NProgress.start();
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `bearer ${token}`;
      }
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
request.interceptors.response.use(
    response => {
      NProgress.done();
      return response.data;
    },
    error => {
      if (error.response.status === 401) {
        localStorage.setItem('authToken', null)
        window.location.href = `https://jieruimi.top/oauth/authorize?client_id=client&redirect_uri=http://localhost:3000/&response_type=code`;
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
    return request({
      url: url,
      params: data,
      method: method
    });
  } else {
    return request({
      url: url,
      data: data,
      method: method
    });
  }
}
