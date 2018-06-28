var app = getApp();
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
    var that = this;
    //请求参数的设置
    var address = {
      dataType: 'json',
      openid: app.globalData.userRole.wxOpenId,
    };
    app.util.getPort('goods_take_delivery', app, address, function (e) {
      console.log(e);
      if (e.data.code == 200) {
        that.setData({
          slide: res.data.body
        })
      } else {
        wx.showToast({
          title: '服务器走神啦',
        })
      }
    })
  },
  submit: function (e) {
    wx.navigateTo({
      url: '/pages/goods/newly_increased/newly_increased',
    })
  },
  //添加和编辑的跳转及传递数据给后台
  bluepencil: function (e) {
    var that = this;
    // console.log(e);

    if (e.currentTarget.dataset.func == 1) { //当自定义id为1时，就是从添加地址跳转到收货地址
      wx.navigateTo({
        url: '/pages/goods/newly_increased/newly_increased',
      })
    } else {  //否则就是从编辑按钮跳转到的收货地址
      var changeid = that.data.id;
      var info = changeid;
      wx.navigateTo({
        url: '/pages/goods/newly_increased/newly_increased?id=' + info.id + "&shr=" + info.shr + "&shrTel=" + info.shrTel + "&province=" + info.province + "&city=" + info.city + "&area=" + info.area + "&shrAddr=" + info.shrAddr + "&isDefault=" + info.isDefault
      })
    }
  },
  //默认地址
  tacitlyApprove: function (e) {
    var that = this;
    console.log(e);
    var isdefault = e.currentTarget.dataset.default;
    var id = e.currentTarget.dataset.id;
    var openid = app.globalData.userRole.wxOpenId;
    console.log(isdefault)
    wx.showModal({
      title: '默认地址设置',
      content: isdefault == 0 ? '设为默认？' : '取消默认?',
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          if (isdefault == 0) {
            var pitch = that.data.isdefault == 1;
            that.setData({
              isdefault: pitch,
            })
          } else if (isdefault == 1) {
            var unselected = that.data.isdefault == 0;
            that.setData({
              isdefault: unselected,
            })
          }
        } else if (res.cancel) {
          console.log("取消")
        }
      },
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