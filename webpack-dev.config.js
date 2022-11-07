const { merge } = require("webpack-merge");
const commonConfig = require("./webpack-common.config");

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    contentBase: "./public",
    compress: true,
    hot: true
  },
  devtool: "source-map",
});
