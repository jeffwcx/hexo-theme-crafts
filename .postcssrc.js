/**
 * POST CSS配置
 * 主要为autoprefixer配置
 * 兼容目标是尽量兼容所有浏览器:)
 */
module.exports = () => ({
  plugins: [
    require('autoprefixer')({
      browsers: ['> 0% in CN', 'IE >= 8']
    })
  ]
})
