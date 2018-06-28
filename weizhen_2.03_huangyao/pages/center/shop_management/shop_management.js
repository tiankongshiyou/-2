var app = getApp();
var addr = app.globalData.addr;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  //搜索框
  search: function (e) {
    var that = this;
    console.log(e);
    that.setData({
      inp: e.detail.value
    })
  },
//搜索商品
  search_fun: function (e) {
    var that = this;
    if (that.data.inp == null || that.data.inp == undefined) {
      wx.showToast({
        title: '不能为空',
        image: '/img/search_shop/fault.png',
        duration: 600,
      })
      return
    } else {
      wx.showLoading({
        title: '搜索中',
      })
      wx.request({
        url: addr + "/wx/shops/queryGoods",
        data: {
          shopname: that.data.inp
        },
        header: {
          "content-type": "json"
        },
        success: function (res) {
          console.log(res);
          var goodsName = res.data.body;
          if (goodsName == null || goodsName == undefined || goodsName.length == 0) {
            wx.showToast({
              title: '查询不到此商品',
              duration: 1000,
            })
            return;
          } else {
            that.setData({
              goodsName: goodsName
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
            icon: 'loading'
          })
        },
      })
    }

  },
  query: function (e) {
    var that = this;
    that.search_fun();
    if (that.data.inp == undefined) {
      that.setData({
        inp: null,
      })
    }
  },
  search_confirm: function (e) {
    var that = this;
    that.search_fun();
  },
  shop_detail: function (e) {
    var shopid = e.currentTarget.dataset.shopid
    wx.navigateTo({
      url: '/pages/shop_detail/shop_for_detail?shopid=' + shopid,
    })
  },
  

//出售、下架
  getGoodsInfo: function (goodsid, goodsStatus) {
    var that = this;
    wx.request({
      url: addr + '/wx/shops/updateGoodsStatus',
      dataType: 'json',
      data: {
        goodsid: goodsid,
        goodsStatus: goodsStatus,
      },
      success: function (res) {
        console.log(res.data.body);
        var goodsData = res.data.body;
        if (res.data.body == '') {
          wx.showToast({
            title: '暂无数据',
          })
        } else {
          for (var i = 0; i <= goodsData.length - 1; i++) {
            if (goodsData[i].goodsName.length >= 13) {
              goodsData[i].goodsName = goodsData[i].goodsName.substring(0, 13) + '...';
            }
          }
          that.setData({
            shop: goodsData,
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
  },
  getUserInfo:function(e){
    var that = this;
  },
  /*** 滑动切换***/
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /*** 点击切换***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },

  jump : function(e){
    var that = this;
    console.log(e)

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