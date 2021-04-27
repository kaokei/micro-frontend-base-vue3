module.exports = {
  lintOnSave: false,
  transpileDependencies: ['@kaokei/post-bridge', '@kaokei/iframe-manager'],
  devServer: {
    port: 8080,
    disableHostCheck: true, // solve Invilid host header problem
    hotOnly: true, // 热更新
  },
};
