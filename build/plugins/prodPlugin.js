const webpack = require('webpack')
const OptimizeCSS = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { resolve } = require('../utils')

const basePlugin = require('./basePlugin')

module.exports = basePlugin.concat([
  new CleanWebpackPlugin(['source'], {
    root: resolve()
  }),
  new OptimizeCSS({
    cssProcessorOptions: {
      safe: true
    }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new UglifyJsPlugin({
    sourceMap: true
  })
])
