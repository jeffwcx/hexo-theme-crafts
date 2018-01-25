
const { resolve, getEntry } = require('./utils')
const baseRule = require('./rules/baseRule')
const prodPlugin = require('./plugins/prodPlugin')
const entry = require('./entry')

module.exports = {
  entry: getEntry(entry),
  output: {
    path: resolve('source'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: baseRule
  },
  plugins: prodPlugin,
  devtool: '#source-map'
}
