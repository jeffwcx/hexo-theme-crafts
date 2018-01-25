const extractTextPlugin = require('extract-text-webpack-plugin')
const { resolve } = require('../utils')
module.exports = [
  {
    test: /\.js$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src')],
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  },
  {
    test: /\.(scss|sass)$/,
    use: extractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    })
  },
  {
    test: /\.css$/,
    use: extractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader']
    })
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src')],
    exclude: [resolve('node_modules')]
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-sprite-loader',
        options: { extract: true }
      },
      'svgo-loader'
    ],
    include: [resolve('src/assets/icons')]
  },
  {
    test: /\.(woff|woff2|ttf|eot|svg)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('source/assets/fonts/[name].[hash:8].[ext]')
        }
      }
    ],
    exclude: [resolve('src/asset/icons')]
  },
  {
    test: /\.(png|jpe?g|gif|webp)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('source/assets/images/[name].[hash:8].[ext]')
        }
      }
    ]
  }
]
