module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      },
      "/login": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/login": "/"
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
