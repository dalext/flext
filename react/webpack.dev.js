var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var commonConfig = require("./webpack.common.js");
var path = require("path");

module.exports = webpackMerge(commonConfig, {
  devtool: "#cheap-module-eval-source-map",

  // entry: {
  //     dev: 'webpack/hot/dev-server'
  // },

  output: {
    path: path.join(process.cwd(), "/dist"),
    publicPath: "http://localhost:3000/",
    filename: "[name].js"
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      SERVER_ADDR: JSON.stringify("http://192.168.1.42:5555"),
      SERVER_LOCATION: JSON.stringify("http://192.168.1.42"),
      COLLAB_SOCKET: JSON.stringify("ws://192.168.1.42:5555"),
      SERVER_DOMAIN: JSON.stringify("localhost"),
      SERVER_PORT: JSON.stringify(3000)
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: "minimal",
    inline: true,
    hot: true
  }
});
