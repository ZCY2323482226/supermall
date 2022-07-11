const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  lintOnSave:false,
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'views':'@/views',
        'network':"@/network"
      }
    }
  }

})

