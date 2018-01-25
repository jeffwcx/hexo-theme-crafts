
const { resolve, getEntry } = require('./utils')
const baseRule = require('./rules/baseRule')
const devPlugin = require('./plugins/devPlugin')
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
  plugins: devPlugin,
  devtool: '#source-map',
  watch: true
}
