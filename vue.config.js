module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://120.26.187.170/",
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
