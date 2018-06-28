
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //获取手机号码的value
  cellphoneNumber: function(e) {
    console.log(e.detail.value)
    this.setData({
      cellphone: e.detail.value
    })
  },
  //获取验证码的value
  identifyingCode: function(e) {
    console.log(e.detail.value)
    this.setData({
      identifying: e.detail.value
    })
  },

  //绑定
  basic: function(e) {
    var that = this;
    var cellphone = that.data.cellphone;//从data中获取手机号码的value值
    var identifying = that.data.identifying;//从data中获取验证码的value值
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;//手机号码的正则表达式
    if (cellphone == '' || cellphone == undefined || cellphone == null) {
      wx.showToast({
        title: '手机号码不为空',
      })
      return
    } else if (!myreg.test(cellphone)) {
      wx.showToast({
        title: '号码格式有误',
      })
      return
    } else if (identifying == '' || identifying == undefined || identifying == null) {
      wx.showToast({
        title: '验证码不为空',
      })
      return
    }else if (identifying.length < 6) {
      wx.showToast({
        title: '验证码为6位',
      })
      return
    } else {
      wx.navigateTo({
        url: '/pages/center/basic/basic',
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