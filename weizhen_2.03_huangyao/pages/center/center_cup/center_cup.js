var app = getApp();
Page({
  data: {
    currentTab: 0,
    cobber: [],
  },
  bintap: function () {
    wx.navigateTo({
      url: '/pages/business/business',
    })
  },
  onLoad: function (options, openid, state) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(app.globalData.userRole.wxOpenId, "******************************")
    var that = this
    var openId = app.globalData.userRole.wxOpenId;
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + '/coupons/getCouponsList',
      method: "POST",
      dataType: "json",
      data: {
        openid: openid,
        state: state,
      },
      success: function (res) {
        console.log(res, "**************************onLoad");
        if (res.data.code == 200){
          var cobber = res.data.body.result;
          // console.log(cobber[0].state - 1);
          that.setData({
            cobber: cobber,
          })
        }else{
          wx.showToast({
            title: '服务器走神啦',
          })
        }
        
      },
      fail: function (err) {
        console.log(err)
        wx.showToast({
          title: '网络异常',
        })
      }
    })

    // var center_cupjson = {
    //   openid: openId,
    //   dataType: "json"
    // }
    // app.util.getPort("center_center_cup", app, center_cupjson, function (res) {
    //   console.log(res)
    // var braceNumber = res.data.body.braceNumber
    // var unusedNumber = res.data.body.unusedNumber
    // var usedNumber = res.data.body.usedNumber
    // that.setData({
    //   braceNumber: braceNumber,
    //   unusedNumber: unusedNumber,
    //   usedNumberr: usedNumber
    // })
    //   console.log(res.data.body)
    // })
  },
  //滑动切换
 
  
  //获取优惠券
  getCoupon: function (openid, state) {
    var that = this;
    //数据的请求
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + '/coupons/getCouponsList',
      method: "POST",
      dataType: "json",
      data: {
        openid: openid,
        state: state,
      },
      success: function (res) {
        console.log(res, "**************************333");
        var cobber = res.data.body.result;
        // console.log(cobber[0].state - 1);
        that.setData({
          cobber: cobber,
        })
      },
      fail: function (err) {
        console.log(err)
        wx.showToast({
          title: '网络异常',
        })
      }
    })
  },
  swiperTab: function (e) {
    var that = this;
    var state = parseInt(e.detail.current);
    var state2 = state + 2;
    console.log(e.detail.current,"/////////////////////////////////e")
    that.setData({
      currentTab: e.detail.current
    });
    that.getCoupon(that.data.openid, state2);
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    console.log(e.target.dataset.current, "------------------------------")
    var state = parseInt(e.target.dataset.current);
    var state2 = state + 2;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
      that.getCoupon(that.data.openid, state2);
    }
  }
})