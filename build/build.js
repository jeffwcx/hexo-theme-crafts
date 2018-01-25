const webpack = require('webpack')
const { getOptions } = require('./utils')

const options = getOptions(process.argv)
let config

if (options.env === 'dev') {
  config = require('./devConf')
} else if (options.env === 'prod') {
  config = require('./prodConf')
}

if (config) {
  webpack(config, (err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // if you are using ts-loader, setting this to true will make typescript errors show up during build
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  })
}
