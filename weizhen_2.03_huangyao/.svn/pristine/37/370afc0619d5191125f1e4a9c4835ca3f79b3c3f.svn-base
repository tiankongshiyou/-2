var app = getApp();
var novel = "";
var echo = "";
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

  },
  // 获取新密码的input的value值
  usedPassword: function (e) {
    console.log(e.detail.value)
    this.setData({
      novel: e.detail.value
    })
  },
  // 获取确认密码的input的value值
  newPassword: function (e) {
    console.log(e.detail.value)
    this.setData({
      echo: e.detail.value
    })
  },
  submit: function (e) {
    var that = this;
    //新密码不能为空或者位数不能小于6位
    if (that.data.novel == '' || that.data.novel == undefined || that.data.novel == null) {
      console.log(that.data.novel)
      wx.showToast({
        title: '新密码不能为空',
      })
      return
    } else if (that.data.novel.length < 6) {
      wx.showToast({
        title: '长度只能为6位',
        icon: "success"
      })//新密码和重复密码输入的值的状态判断
      return
    } else if (that.data.novel !== that.data.echo) {
      wx.showToast({
        title: '密码不一致',
        icon: "success"
      })
      return
    }
    //用户openId的获取
    var openId = app.globalData.userRole.wxOpenId;
    //请求参数的设置
    var up_data = {
      dataType: 'json',
      opendId: openId,
      passWd: that.data.echo //将确认密码的值传递给后台
    };
    app.util.getPort('center_set_withdraw_password', app, up_data, function (e) {
      //后台的code参数返回值为正常状态200时执行跳转
      if (e.data.code == '200') {
        wx.navigateTo({
          url: '/pages/center/basic/basic',
        })
      } else {
        wx.showToast({
          title: '服务器打盹',
        })
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