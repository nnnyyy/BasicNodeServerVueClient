const path = require('path')

module.exports = { 
  css: {
    loaderOptions: {
      scss:  {
        data: `@import "@/styles/_variables.scss";@import "@/styles/_globalStyles.scss";`
      }
    }
  },
  outputDir: path.resolve(__dirname, '../backend/public'),
  devServer: {
    proxy: 'http://localhost:3000'      
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '겜라이브넷'
    }
  }
}