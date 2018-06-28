var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    region: ['湖南省', '长沙市', '天心区'],
    isDefault: 0,
    cuts: [],
    shr: "",
    shrTel: "",
    addr: "",
  },
  //获取收货人的姓名
  userNameInput: function (e) {
    this.setData({
      shr: e.detail.value
    })
    console.log(e.detail.value)
  },
  //获取收货人的电话号码
  userTelInput: function (e) {
    this.setData({
      shrTel: e.detail.value,
    })
  },
  //获取详细地址
  userAddrInput: function (e) {
    this.setData({
      addr: e.detail.value
    })
  },
  submit: function (e) {
    var that = this;
    var openId = app.globalData.userRole.wxOpenId;//用户openId的获取
    var shr = that.data.shr;//获取收货人的value值
    var shrTel = that.data.shrTel;//获取收货人的电话号码value值
    var addr = that.data.addr;//获取详细地址的value值
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;//手机号码的正则表达式
    console.log(that.data.shr);
    if (shr == "" || shr == undefined || shr == null) {
      wx.showToast({
        title: '收货人不能为空',
      })
      return
    } else if (shrTel == "" || shrTel == undefined || shrTel == null) {
      wx.showToast({
        title: '号码不能为空',
      })
      return
    } else if (!myreg.test(shrTel)) {
      wx.showToast({
        title: '格式或长度有误',
      })
      return
    } else if (addr == "" || addr == undefined || addr == null) {
      wx.showToast({
        title: '地址不能为空',
      })
      return
    }
    //请求参数的设置
    var gain_data = {
      dataType: 'json',
      opendId: openId,
      shr: shr, //将收货人的值传递给后台
      sfrtel: shrTel,//将收货人的电话号码的值传递给后台
      province: that.data.region[0], //省市区详细地址
      city: that.data.region[1],
      area: that.data.region[2],
      sfrAddr: addr,//将详细地址的值传递给后台
    };
    app.util.getPort('goods_newly_increased', app, gain_data, function (e) {
      //后台的code参数返回值为正常状态200时执行跳转
      if (e.data.code == '200') {
        wx.navigateTo({
          url: '/pages/goods/take_delivery/take_delivery',
        })
      } else {
        wx.showToast({
          title: '服务器打盹',
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindRegionChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    console.log(this.data.region[0] + this.data.region[1] + this.data.region[2])
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