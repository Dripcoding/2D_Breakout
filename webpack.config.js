const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./public/js/index.ts",
  devServer: {
    contentBase: "./dist"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "2D Breakout",
      scriptLoading: "defer"
    }),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
