var app = getApp();
var addr = app.globalData.addr
var cdnaddr = app.globalData.cdnaddr
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
    var that = this
    let userInfo = wx.getStorageSync('userRole');
    this.setData({
      user: userInfo
    })
    console.log(that.data.userInfo);
    var openid = app.globalData.userRole.wxOpenId
    
    that.setData({
      cdnaddr: cdnaddr,
    })
    wx.request({
      url: "http://192.168.1.186:8080/weizhen" + '/wx/memberscenter/getRzwzQrcodeUrl',
      method: "post",
      dataType: "json",
      data: {
        openid: openid
      },
      success: function (res) {
        console.log(res)
        console.log(that,"++++++++++++++++++++++")
        if (res.data.code == 200) {
          console.log(res.data.body)
          that.setData({
            userInfo: res.data,
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
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