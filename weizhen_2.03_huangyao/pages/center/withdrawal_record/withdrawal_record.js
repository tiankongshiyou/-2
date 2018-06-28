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
    var recordjl = ({
      openid: app.globalData.userRole.wxOpenId,
      datatype:"json"
    })
    wx.request({
      url: "https://www.worldwz.com/api"+'/order/reflectRecords',
      dataType:"json",
      method:"post",
      data:{
        openid: app.globalData.userRole.wxOpenId,
      },
      success:function(res){
        if (res.data.code == 200){
          console.log(res.data.body, "****************************")
          that.setData({
            put_forward:res.data.body
          })
        }
        
      }
    })
    // app.util.getPort('get_withdrawal_record_by_id', app, recordjl , function (res){
    //   console.log('完成  =======>' +res)
    //   if (res.data.code == "200") {
    //     that.setData({
    //       record: res.data.body,
    //     })
    //   }else {
    //     wx.showToast({
    //       title: '暂无提现记录',
    //     })
    //   }
    // })
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