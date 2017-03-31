var path = require('path')

module.exports = {
  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {
    'vue': path.resolve(__dirname, '../src/js/lib/vue.min.js'),
    'axios': path.resolve(__dirname, '../src/js/lib/axios.min.js')
  },

  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extensions: ['.js', '.css', '.less', '.vue'],
}