var app = getApp()
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
  withdrawal:function(e){
    console.log(e.detail.value)
    this.setData({
      awal: e.detail.value
    })
  },
  submit: function (e) {
      var that = this;
      var password = that.data.awal
      if (password == ''|| password == undefined || password == null) {
        wx.showToast({
          title: "密码不能为空",
        }) 
        return
      } else if (password.length < 6) {
        wx.showToast({
          title: '密码位数为6位',
        })
        return
      }
      // console.log(e)
      var push_data = {
        openid: app.globalData.userRole.wxOpenId,
        password: that.data.awal,
      };
      app.util.getPort('get_withdrawal_passwd', app, push_data, function (e) {
        console.log(e)
        if (e.data.code == "200") {
          if(e.data.body == true) {
            wx.navigateTo({
              url: '/pages/order_center/withdrawal_result ? openid =' + +that.data.openid,
            })
          }
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