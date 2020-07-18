const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

require('dotenv').config();

module.exports = {
    entry: "./src/index.tsx",
    target: "web",
    /*mode: "development",*/
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
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
          loader: "css-loader",
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          API_KEY: JSON.stringify(process.env.API_KEY)
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
        favicon: "./src/favicon.ico"
      })
    ],
  };
