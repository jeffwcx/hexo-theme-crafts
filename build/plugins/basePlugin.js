const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SpritePlugin = require('svg-sprite-loader/plugin')
const CopyStatic = require('copy-webpack-plugin')
const { resolve } = require('../utils')

module.exports = [
  new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true,
    disable: false
  }),
  new SpritePlugin({
    plainSprite: true
  }),
  new CopyStatic([{
    from: resolve('static'),
    to: resolve('source/assets/images')
  }])
]
