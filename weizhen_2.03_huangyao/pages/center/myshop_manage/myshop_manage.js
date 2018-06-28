// pages/center/myshop_manage/myshop_manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //商品管理
  shop_management:function(){
    wx.navigateTo({
      url: "/pages/center/shop_management/shop_management",
    })
  },
  //营销活动
  marketing_activity:function(){
    wx.navigateTo({
      url: "/pages/center/marketing_activity/marketing_activity",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userRole');
    this.setData({
      userInfo: userInfo
    })
    console.log(this.data.userInfo,"+222222222222222222222222222");
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