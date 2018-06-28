// pages/micro_powder/micro_powder.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      inputVle:""
  },
  bindtap:function(){
    wx.navigateTo({
      url: '/pages/center/about_text/about_text',
    })
  },
  search_team: function (res){
    var that = this
    console.log(res)
    var inputVle = res.detail.value
    var openid = app.globalData.userRole.wxOpenId
    var wxNc = app.globalData.userRole.wxNc
    console.log(app.globalData.userRole.wxNc)
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + '/wx/shops/getFansBylike',
      method: "post",
      dataType: "json",
      data: {
        openid: "o40Yj0RFNXUB55rvupYnNg5HS2pE",
        wxNc: wxNc
      },
      success: function (res) {

        var shop_collect = res.data.body
        if (inputVle !== "") {
          if (res.data.code == 200) {
            console.log("成功", "///////////////////////")
            console.log(res.data)
            if (res.data.body.length == 0) {
              wx.showModal({
                title: '查询失败',
                content: '没有此类粉丝',
              })
            } else {
              console.log(res);
              var micro_powder = res.data.body;
              for (let i = 0; i <= shop_collect.length - 1; i++) {
                micro_powder[i].shopRemark = dizhi[i].shopRemark.substring(0, 6) + '...';
                micro_powder[i].shopAddr = dizhi[i].shopAddr.substring(0, 15) + '...';
              }
              that.setData({
                micro_powder: micro_powder
              })
            }
          } else {
            wx.showToast({
              title: '网络中断啦',
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '内容不能为空',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: function (res) {
        console.log(err)
      }
    })
  },
  bindinput:function(res){
    var that = this
    console.log(res.detail.value)
    that.setData({
      inputVle:res.detail.value
    })
  },
  bindconfirm:function(res){
    var that = this
    console.log(res)
    var inputVle = res.detail.value
    var openid = app.globalData.userRole.wxOpenId
    var wxNc = app.globalData.userRole.wxNc
    console.log(app.globalData.userRole.wxNc)
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + '/wx/shops/getFansBylike',
      method:"post",
      dataType:"json",
      data:{
        openid: "o40Yj0RFNXUB55rvupYnNg5HS2pE",
        wxNc: wxNc
      },
      success:function(res){
        
        var shop_collect = res.data.body
        if (inputVle !== "") {
          if (res.data.code == 200) {
            console.log("成功", "///////////////////////")
            console.log(res.data)
            if (res.data.body.length == 0) {
              wx.showModal({
                title: '查询失败',
                content: '没有此类粉丝',
              })
            } else {
              console.log(res);
              var micro_powder = res.data.body;
              for (let i = 0; i <= shop_collect.length - 1; i++) {
                micro_powder[i].shopRemark = dizhi[i].shopRemark.substring(0, 6) + '...';
                micro_powder[i].shopAddr = dizhi[i].shopAddr.substring(0, 15) + '...';
              }
              that.setData({
                micro_powder: micro_powder
              })
            }
          } else {
            wx.showToast({
              title: '网络中断啦',
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '内容不能为空',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail:function(res){
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = app.globalData.userRole.wxOpenId
    var wxNc = app.globalData.userRole.wxNc
    console.log(app.globalData.userRole.wxOpenId)
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + '/wx/shops/getFansBylike',
      method: "post",
      dataType: "json",
      data: {
        openid: openid,
        wxNc: wxNc
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
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