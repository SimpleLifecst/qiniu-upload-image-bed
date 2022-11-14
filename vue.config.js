module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9090", // 目标ip
        ws: true,
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }
  }
}
