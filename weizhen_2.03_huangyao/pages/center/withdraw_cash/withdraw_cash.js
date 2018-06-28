// pages/center/withdraw_cash/withdraw_cash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputvule: "",
    model: [
      {

        text: "推荐收益+团队业绩",
        selectImage: 0,

      },
      {

        text: "粉丝收益+销售业绩",
        selectImage: 1,

      },

    ]
  },
  withdrawal_result: function () {
    wx.navigateTo({
      url: "/pages/center/withdrawal_result/withdrawal_result",
    })
  },
  bindinput: function (res) {
    var that = this
    console.log(res.detail.value, "***************************")
    that.setData({
      // inputvule:
    })
  },

  selectClick: function (event) {
    var that = this
    
    console.log(that.data.model, "---------------------------")
    console.log(event.currentTarget.id)

    that.data.model[event.currentTarget.id].selectImage

    for (var i = 0; i < that.data.model.length; i++) {
      if (event.currentTarget.id == i) {
        that.data.model[i].selectImage = 0
      }
      else {
        that.data.model[i].selectImage = 1
      }
    }
    that.setData(that.data)


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this,"////////////////////")
    var that = this
    var havamoney = "";
    wx.request({
      url: "https://www.worldwz.com/api" + "/wx/memberscenter/getReflectType",
      method: "post",
      dataType: "json",
      success: function (res) {
        console.log(res)
        if (options.watermoney == "null" || options.watermoney == null || options.availablemoney == "null" || options.availablemoney == null) {
          havamoney = 0;
        } else {
          if (options.codeValue == "1001") {
            havamoney = options.watermoney;
          } else {
            havamoney = options.availablemoney;
          }

        }
        that.setData({
          model: res.data.body
        })
      }, fail: function (err) {
        wx.showToast({
          title: '网络异常',
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