// pages/center/property/property.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  // 提現
  withdraw_cash:function(e){
    var that = this
    console.log(that.data.property.availableMoney,"200")
    var openid = app.globalData.userRole.wxOpenId
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + "/order/balancePayMoney",
      dataType: "json",
      method: "post",
      data: {
        opendId: openid
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data, "**********************")
          //收益合计
          var total = res.data.body.availableMoney
          that.setData({
            property: res.data.body,
            total: total
          })
          var availablemoney = that.data.property.availableMoney
          var watermoney = that.data.property.waterMoney
          wx.navigateTo({
            url: '/pages/center/withdraw_cash/withdraw_cash?availablemoney=' + availablemoney + '&watermoney=' + watermoney,
          })
        } else {
          wx.showToast({
            title: '服务器走神啦',
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
    
  },
  //提现记录
  withdrawal_record: function () {
    wx.navigateTo({
      url: "/pages/center/withdrawal_record/withdrawal_record",
    })
  },
  //我的资产详情
  asset_details:function(){
    wx.navigateTo({
      url: "/pages/center/asset_details/asset_details",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openid = app.globalData.userRole.wxOpenId
    wx.request({
      url: "http://192.168.1.186:8080/weizhen" + "/order/balancePayMoney",
      dataType:"json",
      method:"post",
      data:{
        opendId: openid
      },
      success:function(res){
        console.log(res,"出来")
        if (res.data.code == 200){
          console.log(res.data.body, "**********************")
          //收益合计
          that.setData({
            property: res.data.body       
          })
        }else{
          wx.showToast({
            title: '服务器走神啦',
          })
        }
      },
      fail:function(err){
        console.log(err)
      }
    }),
    app.util.getPort("center_property", app, {opendId:openid,dataType:"json"},function(res){
      console.log(app.globalData.userRole.wxOpenId)
      console.log(res.data.code)
      if (res.data.code == 200){
        console.log(res.data.body,"//////////////////")
        var property = res.data.body
        that.setData({
          property: property
        })
       }else{
         wx.showToast({
           title: '网络中断啦',
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