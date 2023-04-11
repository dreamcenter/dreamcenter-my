module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9999'
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '毕设 | 学课竞赛博客'
      return args
    })
    config.plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  productionSourceMap: false
}
