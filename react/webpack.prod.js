var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var path = require('path');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    // devtool: 'source-map',

    output: {
        path: path.join(process.cwd(), '/dist'),
        // publicPath: '/',
        filename: '[name].[hash].js'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true,
                except: ['$super']
            }
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                safe: true,
                discardUnused: false, // no remove @font-face
                reduceIdents: false, // no change on @keyframes names
                zindex: false // no change z-index
            },
            canPrint: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
});