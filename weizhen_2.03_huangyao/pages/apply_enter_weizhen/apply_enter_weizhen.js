var app = getApp();
var addr = app.globalData.addr;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  commercialTenant: function(){
    wx.navigateTo({
      url: '/pages/apply_enter_weizhen/commercial_tenant/commercial_tenant',
    })
  },
  turnInto:function(){
    wx.navigateTo({
      url: '/pages/apply_enter_weizhen/turn_into/turn_into',
    })
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
  //   var that = this;
  //   console.log(options,"---------------------------------options")
  //   //推荐人的openid
  //   var p_openid = options.openid;
  //   var openid = app.globalData.userRole.wxOpenId

  //   //被推荐人的code
  //   app.getUserRole(function (userRole) {
  //     console.log(userRole.wxOpenId,"--------------------------")
  //     var curOpenid = userRole.wxOpenId;
  //     //绑定关系
  //     that.bindRelation(p_openid, curOpenid)
  //   })
  // },
  // //绑定关系
  // bindRelation: function (p_openid, curOpenid) {
  //   var that = this;
  //   wx.request({
  //     url: addr + '/wx/memberscenter/qrcodeAddMembers',
  //     data: {
  //       p_openid: p_openid,
  //       openid: curOpenid
  //     },
  //     success: function (res) {
  //       console.log(res);
  //       if (!res.data.body) {
  //         wx.showModal({
  //           title: '抱歉',
  //           content: '您已被绑定!',
  //           success(res) {
  //             if (res.confirm) {
  //               wx.switchTab({
  //                 url: '/pages/business/business',
  //               })
  //             } else {
  //               wx.switchTab({
  //                 url: '/pages/business/business',
  //               })
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
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