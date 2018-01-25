const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SpritePlugin = require('svg-sprite-loader/plugin')

module.exports = [
  new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true,
    disable: false
  }),
  new SpritePlugin({
    plainSprite: true
  })
]
