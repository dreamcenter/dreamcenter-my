module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9999'
      }
    }
  },
  chainWebpack: config => {
    config.plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
}
