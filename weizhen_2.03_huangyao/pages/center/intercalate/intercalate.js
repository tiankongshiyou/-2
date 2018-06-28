Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  usedPassword: function(e) {
    console.log(e.detail.value)
    this.setData({
      used: e.detail.value
    })
  },

  newPassword: function(e) {
    console.log(e.detail.value)
    this.setData({
      unused: e.detail.value
    })
  },

  repeatPassword: function(e) {
    console.log(e.detail.value)
    this.setData({
      repeat: e.detail.value
    })
  },
  sumbit: function(e) {
    var that = this;
    var used = that.data.used;
    var unused = that.data.unused;
    var repeat = that.data.repeat;
    if (used == 0 || used == undefined || used == null) {
      wx.showToast({
        title: '旧密码不为空',
      })
      return
    } else if (used.length < 6) {
      wx.showToast({
        title: '旧密码为6位',
      })
      return
      } else if (unused == 0 || unused == undefined || unused == null) {
      wx.showToast({
        title: '新密码不为空',
      })
      return
    } else if (unused.length < 6) {
      wx.showToast({
        title: '新密码为6位',
      })
      return
    }  else if (unused !== repeat) {
      wx.showToast({
        title: '密码不一致',
      })
      return
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