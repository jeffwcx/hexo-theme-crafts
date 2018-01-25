const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { resolve } = require('../utils')

const basePlugin = require('./basePlugin')

module.exports = basePlugin.concat([
  new CleanWebpackPlugin(['source'], {
    root: resolve()
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  })
])
