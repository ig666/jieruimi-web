module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://10.10.110.132:3000/User",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#5862CB",
          "link-color": "#5862CB",
          "border-radius-base": "5px"
        },
        javascriptEnabled: true
      }
    }
  }
};
