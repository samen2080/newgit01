// pages/start/start.js
var http = require('../../utils/config.js');
var app = getApp();
console.log('start.js==1');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("start.js onload=====2=============")
    console.log('http.hostUrl:',http.hostUrl)
    wx.login({
      success(res){
        if(res.code){
          console.log("app.globalData.host:", app.globalData.host + '/home/get_openid')
          console.log("res.code:", res.code)
          wx.request({
            url: app.globalData.host+'/home/get_openid',
            method:'POST',
            data:{
              code:res.code
            },
            success: function (res) {
              console.log(" success login.res", res)
              var obj = {};
              obj.openid = res.data.openid;
              console.log("res.openid",res.data.openid);
              obj.expires_in = Date.now() + res.data.expires_in;
              //console.log(obj);
              wx.setStorageSync('openid', obj.openid);//存储openid  
              wx.setStorage({
                key: 'openid',
                data: obj.openid,
              })
            }
          })
        }else{
          console.log("login failed"+res.errMsg)
        } 
      }
    });
  }, 

  bindGetUserInfo: function (e) {
    console.log('start.js==3==');
    var that = this;
    let openid = wx.getStorageSync('openid');
    if (e.detail.userInfo) {
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo,
        success: function () {
          console.log("openid",that.data.openid);
          app.func.req('login', { openid: openid, user_headimg: e.detail.userInfo.avatarUrl, user_nickname: e.detail.userInfo.nickName, user_sex: e.detail.userInfo.gender}, 'POST', function (res) {
            // console.log("login.res", res)
            if (res.code == 200) {
              wx.redirectTo({
                url: '../index/index',
              })
            }
          });
        }
      }) 
    } else {
      wx.showToast({
        title: '请先授权登录！',
        icon: 'none'
      })
    }
  },

  onLaunch: function () {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})