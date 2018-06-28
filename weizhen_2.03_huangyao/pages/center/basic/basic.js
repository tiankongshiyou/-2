var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputvalue:""
  },
  //联系电话
  replacePhone: function(e) {
    wx.navigateTo({
      url: '/pages/center/replace_phone/replace_phone',
    })
  },
  //绑定电话号码
  noPhone:function(e){
    wx.navigateTo({
      url: '/pages/center/binding_phone/binding_phone',
    })
  },
  //收货地址
  deliveryAddress: function(e) {
    wx.navigateTo({
      url: '/pages/goods/take_delivery/take_delivery',
    })
  },
  // 修改提现密码
  amend: function (e) {
    wx.navigateTo({
      url: '/pages/center/revise_password/revise_password',
    })
  },
  // 重置提现密码
  resetting: function (e) {
    wx.navigateTo({
      url: '/pages/center/identity_validate/identity_validate',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // let userInfo = wx.getStorageSync('userRole');
    // this.setData({
    //   userInfo: userInfo
    // })
    // console.log(that.data.userInfo);
    var wxOpenId = app.globalData.userRole.wxOpenId
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + '/wx/memberscenter/queryMembers',
      method: "post",
      dataType: "json",
      data: {
        wxOpenId: wxOpenId
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          console.log(res.data.body)
          if (res.data.body.phone == null || res.data.body.phone == "") {
            wx.showToast({
              title: '您暂未绑定手机号',
            })
          } 
          that.setData({
            userInfo: res.data.body
          })         
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  bindinput:function(res){
    var that = this
    console.log(res.detail.value,"..........................")
    that.setData({
      inputvalue:res.detail.value
    })
  },
  bindblur:function(res){
    var that = this
    console.log(res.detail.value,"**************************")
    var inputvalue = res.detail.value
    // let userInfo = wx.getStorageSync('userRole');
    // this.setData({
    //   userInfo: userInfo
    // })
    // console.log(that.data.userInfo);
    var wxOpenId = app.globalData.userRole.wxOpenId
    // wx.request({
    //   url: "http://192.168.1.122:8080/weizhen" + '/wx/memberscenter/queryMembers',
    //   method: "post",
    //   dataType: "json",
    //   data: {
    //     wxOpenId: wxOpenId
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     if (res.data.code == 200) {
    //       console.log(res.data.body)
    //       if (res.data.body.phone == null || res.data.body.phone == "") {
    //         wx.showToast({
    //           title: '您暂未绑定手机号',
    //         })
    //       }
    //       that.setData({
    //         userInfo: res.data.body
    //       })
    //     }
    //   },
    //   fail: function (err) {
    //     console.log(err)
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
  onHide: function (options) {
   
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