// pages/center/shop_collect/shop_collect.js
var app = getApp();
var cdnaddr = app.globalData.cdnaddr;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inptval: ""
  },
  bindinput: function (e) {
    console.log(e.detail.value)
    this.setData({
      inptval: e.detail.value
    })
  },
  bindconfirm: function (e) {
    var that = this
    console.log(that.data.inptval, "------------------------")
    var inptval = that.data.inptval
    app.util.getPort("center_shop_collect", app, {}, function (res) {
      var shop_collect = res.data.body
      if (inptval !== "") {
        if (res.data.code == 200) {
          console.log("成功", "///////////////////////")
          console.log(res.data.body)

          if (res.data.body.length == 0) {
            wx.showModal({
              title: '查询失败',
              content: '没有此类商家',
            })
          } else {
            console.log(res);
            var shop_collect = res.data.body;
            for (let i = 0; i <= shop_collect.length - 1; i++) {
              shop_collect[i].shopRemark = dizhi[i].shopRemark.substring(0, 6) + '...';
              shop_collect[i].shopAddr = dizhi[i].shopAddr.substring(0, 15) + '...';
            }
            that.setData({
              shop_collect: shop_collect
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
    })
  },
  search:function(e){
    var that = this
    console.log(that.data.inptval, "------------------------")
    var inptval = that.data.inptval
    app.util.getPort("center_shop_collect", app, {}, function (res) {
      var shop_collect = res.data.body
      if (inptval !== "") {
        if (res.data.code == 200) {
          console.log("成功", "///////////////////////")
          console.log(res.data.body)

          if (res.data.body.length == 0) {
            wx.showModal({
              title: '查询失败',
              content: '没有此类商家',
            })
          } else {
            console.log(res);
            var shop_collect = res.data.body;
            for (let i = 0; i <= shop_collect.length - 1; i++) {
              shop_collect[i].shopRemark = dizhi[i].shopRemark.substring(0, 6) + '...';
              shop_collect[i].shopAddr = dizhi[i].shopAddr.substring(0, 15) + '...';
            }
            that.setData({
              shop_collect: shop_collect
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
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      cdnaddr: cdnaddr
    })
    app.util.getPort("center_shop_collect", app, {}, function (res) {
      console.log(res, "/////////////////////////////")
      if (res.data.code == 200) {
        console.log(res.data.body, "成功", "///////////////////////////////////////////")
        var shop_collect = res.data.body
        that.setData({
          shop_collect: shop_collect
        })
        console.log(shop_collect.length, "///////////////////////////")
      } else {
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