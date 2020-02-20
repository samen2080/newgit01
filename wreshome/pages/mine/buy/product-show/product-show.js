// pages/mine/buy/product-show/product-show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    cancel:false
  },

  // 取消交易/删除订单
  removePro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    that.setData({
      num: index,
      hidden: false
    })
    if (index == 0){
      that.setData({
        txt: "确定要取消吗？"
      })
    } else if (index == 1){
      that.setData({
        txt: "确定要删除吗？"
      })
    }
  },

  // 再想想
  removeCancel: function (e) {
    var that = this;
    that.setData({
      hidden: true
    })
  },

  // 确定
  removeSure: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num; 
    if (num == 0) {
      app.func.req('cancel_trade', { openid: that.data.openid, tra_id: that.data.tra_id }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200) {
          that.getDetail();
          that.setData({
            hidden: true,
            cancel: true
          })
        }
      });
    } else if (num == 1) {
      app.func.req('del_trade', { openid: that.data.openid, tra_id: that.data.tra_id }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200) {
          wx.navigateBack({
            delta: 1
          })
        }
      });
    }   
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    that.setData({
      host: host,
      tra_id: options.tra_id
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
    that.getDetail();
  },
  getDetail:function(){
    var that = this;
    app.func.req('trade_detail/' + that.data.tra_id, {}, 'GET', function (res) {
      // console.log(res);
      that.setData({
        items: res
      })
    });
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