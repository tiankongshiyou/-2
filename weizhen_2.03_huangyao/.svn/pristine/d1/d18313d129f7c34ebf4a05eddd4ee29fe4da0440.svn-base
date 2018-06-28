
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  identityValidate: function (e) {
    console.log(e.detail.value)
    this.setData({
      identity: e.detail.value
    })
  },

  installPassword: function (e) {
    var that = this;
    var identity = that.data.identity;
    if (identity == '' || identity == undefined || identity == null) {
      wx.showToast({
        title: '验证码不为空',
      })
      return
    } else if (identity.length < 6) {
      wx.showToast({
        title: '验证码位数为6',
      })
      return
    } else {
      wx.navigateTo({
        url: '/pages/center/install_password/install_password',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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