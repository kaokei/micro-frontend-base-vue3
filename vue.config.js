module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    disableHostCheck: true, // solve Invilid host header problem
    hotOnly: true, // 热更新
  },
};
