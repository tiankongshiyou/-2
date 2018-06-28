var app = getApp();
Page({
  data: {
    currentTab: 0,
    inputvl:""
  },
  bindinput:function(res){
    var that = this
    console.log(res)
    that.setData({
      inputvl:res.detail.value
    })
  },
  bindconfirm:function(res){
    var that = this
    console.log(res)
    var inputvl = res.detail.value
    var openid = app.globalData.userRole.wxOpenId
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + '/wx/shops/getGroupBylike',
      method: "post",
      dataType: "json",
      data: {
        openid: openid,
        shopName: "cc"
      },
      success: function (res) {
        console.log(res, "----------------------")
        var wxOpenId = app.globalData.userRole.wxOpenId
        if (inputvl !== "") {
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
                myteam: res.data.body,
                wxOpenId: wxOpenId
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
      fail: function (err) {
        console.log(err)
      }
    }) 
  },
  search_team:function(res){
    var that = this
    console.log(res)
    var inputvl = res.detail.value
    var openid = app.globalData.userRole.wxOpenId
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + '/wx/shops/getGroupBylike',
      method: "post",
      dataType: "json",
      data: {
        openid: openid,
        shopName: "cc"
      },
      success: function (res) {
        console.log(res, "----------------------")
        var wxOpenId = app.globalData.userRole.wxOpenId
        if (inputvl !== "") {
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
                myteam: res.data.body,
                wxOpenId: wxOpenId
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
      fail: function (err) {
        console.log(err)
      }
    }) 
  },
  onLoad: function (options) {
    console.log(options)
    var that = this
    var openid = app.globalData.userRole.wxOpenId
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + '/wx/shops/getGroupBylike',
      method: "post",
      dataType: "json",
      data: {
        openid: openid,
        shopName: "cc"
      },
      success: function (res) {
        console.log(res,"----------------------")
        var wxOpenId = app.globalData.userRole.wxOpenId
        if (res.data.code == 200) {
          console.log(res.data.body)
          that.setData({
            myteam: res.data.body,
            wxOpenId: wxOpenId
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    }) 
  },


  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})