var app = getApp();
var bygone = "";
var unused = "";
var duplicate = "";
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
  // 获取旧密码的input的value值
  usedPassword: function (e) {
    console.log(e.detail.value,"usedPassword")
    this.setData({
      bygone: e.detail.value
    })
  },
  // 获取新密码的input的value值
  newPassword: function (e) {
    console.log(e.detail.value, "newPassword")
    this.setData({
      unused: e.detail.value
    })
  },
  // 获取重复密码的input的value值
  repeatPassword: function (e) {
    console.log(e.detail.value, "repeatPassword")
    this.setData({
      duplicate: e.detail.value
    })
  },
  basic: function (e) {
    var that = this;
    console.log(that.data,"///////////////////")
    var usedPassword = that.data.bygone
    var newPassword = that.data.unused
    var repeatPassword = that.data.duplicate
    var openid = app.globalData.userRole.wxOpenId
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + '/order/changeWithdrawPwd',
      method:"post",
      dataType:"json",
      data:{
        openid:openid,
        password:duplicate
      },
      success:function(res){
        if(res.data.code == 200){
          if (usedPassword == undefined || newPassword == undefined || repeatPassword == undefined) {
            wx.showToast({
              title: '不能为空',
            })
          }
          else if (usedPassword.length < 6 || newPassword.length < 6 || repeatPassword < 6) {
            wx.showToast({
              title: '密码不能小于6',
            })
          } else if (newPassword !== repeatPassword || repeatPassword !== newPassword) {
            wx.showToast({
              title: '密码不一致',
            })
          }
        }
        console.log(res)
      },
      fail:function(err){
        console.log(err)
      }
    })
    
    // //用户openId的获取
    // var openId = app.globalData.userRole.wxOpenId;
    // //请求参数的设置
    // var amend_data = {
    //   openid: openId,
    //   oldpassword: that.data.bygone, //将旧密码的值传递给后台
    //   password: that.data.duplicate //将重复密码的值传递给后台
    // };
    // app.util.getPort('center_revise_withdraw_password', app, amend_data, function (e) {
    //   //后台的code参数返回值为正常状态200时执行跳转
    //   if (e.data.code == '200') {
    //     wx.navigateTo({
    //       url: '/pages/center/basic/basic',
    //     })
    //   } else {
    //     wx.showToast({
    //       title: '服务器打盹',
    //     })
    //   }
    // })
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