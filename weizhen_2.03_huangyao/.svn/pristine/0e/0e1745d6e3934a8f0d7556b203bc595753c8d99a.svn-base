var app = getApp();
// pages/shop_comments/shop_comments.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var shopid = options.shopid;
    wx.showLoading({title:'加载中'});
    that.setData({
      shopid: shopid
    });
    that.getComments(shopid);
  },
  //获取商铺评论
  getComments: function (shopid) {
    var that = this;
    app.util.getPort('get_shop_commets_by_id', app, { shopid: shopid }, function (e) {
      wx.hideLoading();
      if (e.data.body != null && e.data.body != undefined) {
        that.setData({
          comments: e.data.body,
        })
      }
    }, function (e) {
      wx.showToast({
        title: '没有找到对应的评论列表',
      })
    }, function (e) {
      wx.hideLoading();
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