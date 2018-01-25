const path = require('path')

module.exports = {
  /**
   * 路径解析
   */
  resolve: function (src) {
    return path.join(__dirname, '..', src || '')
  },
  /**
   * 解析入口
   */
  getEntry: function (entry) {
    const chunks = Object.keys(entry)
    const result = {}
    chunks.forEach((chunk) => {
      result[chunk] = entry[chunk].input
    })
    return result
  },
  /**
   * 获取npm scripts参数
   */
  getOptions: function (argv) {
    const options = {}
    for (let i = 2; i < argv.length; i += 1) {
      const param = argv[i]
      const kv = param.split('=')
      options[kv[0]] = kv[1]
    }
    return options
  }
}
