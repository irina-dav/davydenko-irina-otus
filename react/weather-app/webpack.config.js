const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

require('@babel/polyfill');
require('dotenv').config();

module.exports = {
    entry: ['babel-polyfill',"./src/index.tsx"],
    target: "web",
    /*mode: "development",*/
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
      publicPath: '/'
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: require.resolve("babel-loader"),
          exclude: /node_modules/,
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        },
        {
          test: /\.css$/,
          //loader: "css-loader",
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  devServer: {
    historyApiFallback: true,
  },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          API_KEY: JSON.stringify(process.env.API_KEY),
          API_KEY_TOMTOM: JSON.stringify(process.env.API_KEY_TOMTOM)
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
        favicon: "./src/favicon.ico"
      })
    ],
  };
