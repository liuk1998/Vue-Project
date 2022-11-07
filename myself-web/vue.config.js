const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 配置反向代理
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
