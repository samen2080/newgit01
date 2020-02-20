//app.js
//this is a comment
var http = require('utils/config.js'); //接口配置
var userInfo = {};
App({
  onLaunch: function () {
    console.log("hello")
  },
  
  globalData: {
    userInfo: null,
    host: 'https://www.xqtechinfo.com/wreshome/',
    appid: 'wx9b24a97022c835ec',
    secret: '95fa88d48b83c6d4ada04374f958ff6b',
  },

  func: {
    req: http.req
  },
})