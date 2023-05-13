module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9999'
      },
      '/sl': {
        target: 'http://localhost:9999'
      },
      '/s1': {
        target: 'http://localhost:9999'
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '时光潜流 | 妹控的中二君'
      return args
    })
    config.plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  productionSourceMap: false
}
