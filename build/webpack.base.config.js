const path = require("path");
const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HappyPack = require("happypack");

/**
 * 导入webpack配置
 */
module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx|ts|tsx)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "happypack/loader?id=babel",
      //     },
      //   ],
      //   include: [path.resolve(__dirname, "../src")],
      //   exclude: [path.resolve(__dirname, "../node_modules")],
      // },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
        include: [path.resolve(__dirname, "../src")],
        exclude: [path.resolve(__dirname, "../node_modules")],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            // 抽离css文件
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          {
            // 按需引入antd样式
            loader: "less-loader",
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024,
            outputPath: "images/",
            name: "[name].[hash].[ext]",
          },
        },
      },
    ],
    noParse: /jquery|lodash/,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@config": path.resolve(__dirname, "../config"),
    },
  },
  plugins: [
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
    // new HappyPack({
    //   id: "babel",
    //   loaders: ["babel-loader?cacheDirectory"],
    //   // 电脑性能差的话不建议开启，或者将threads调低
    //   threads: 2,
    // }),
  ],
};
