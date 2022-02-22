const { merge } = require("webpack-merge");
const commonConfig = require("./webpjs");

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    contentBase: "./public",
    compress: true,
    hot: true
  },
  devtool: "inline-source-map"
});
