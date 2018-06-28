// pages/order_center/order_center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:0,
    tab: ['全部', '待付款', '待发货', '已发货', '已完成', '售后']
  },
  change_status:function(e){
    console.log(e.currentTarget.dataset.index);
    let status = e.currentTarget.dataset.index;
    this.setData({
      status: status
    })
  },
  close_order:function(){
    wx.showModal({
     content : "取消订单？",
     confirmColor : "#ff5d00"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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