var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var pkgBower = require("./package.json");

var baseHref = process.env.WP_BASE_HREF ? process.env.WP_BASE_HREF : "/";

module.exports = {
  entry: {
    vendor: "./app/Vendor.jsx",
    app: "./app/App.jsx"
  },

  resolve: {
    modules: [path.join(__dirname, ""), "node_modules", "bower_components"],
    extensions: [".js", ".jsx"],
    alias: {
      moment$: "moment/moment.js",
      d3$: "d3/d3.min.js"
    }
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /jquery\.flot\.resize\.js$/,
        use: "imports-loader?this=>window"
      },
      {
        test: /\.js/,
        use: "imports-loader?define=>false"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["es2015", "react"],
            compact: false
          }
        }
      },
      {
        test: /\.css$/,
        exclude: path.join(process.cwd(), "/app"),
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        })
      },
      {
        test: /\.css$/,
        include: path.join(process.cwd(), "/app"),
        use: "raw-loader"
      },
      {
        test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
        use: "url-loader?prefix=font/&limit=10000"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: "url-loader?limit=10000"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          } /*{
                        loader: 'rtlcss-loader' // uncomment for RTL
                    },*/,
          {
            loader: "sass-loader",
            options: {
              outputStyle: "expanded"
            }
          }
        ]
      }
    ]
    // , noParse: [/\.min\.js/]
  },

  resolveLoader: {
    alias: {
      "rtlcss-loader": path.join(__dirname, "rtlcss-loader.js")
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor[hash:6].js"
    }),
    new HtmlWebpackPlugin({
      template: "app/index.html",
      baseUrl: baseHref
    }),
    new CopyWebpackPlugin([
      {
        from: "img",
        to: "img",
        context: path.join(__dirname, "app")
      },
      {
        from: "server",
        to: "server",
        context: path.join(__dirname, "app")
      },
      {
        from: "fonts",
        to: "fonts",
        context: path.join(__dirname, "app")
      },
      {
        from: path.resolve(__dirname, "", "..") + "/editor_css",
        to: "css"
      },
      // {
      //   from: path.join(__dirname, "", "..") + "/public/examples/prosemirror.js"
      // },
      // {
      //   from: path.join(__dirname, "", "..") +
      //     "/public/examples/collab/example.js"
      // }
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    // https://github.com/moment/moment/issues/2979#issuecomment-189899510
    new webpack.ContextReplacementPlugin(
      /\.\/locale$/,
      "empty-module",
      false,
      /js$/
    ),
    new webpack.DefinePlugin({
      WP_BASE_HREF: JSON.stringify(baseHref)
    })
  ]
};
