Page({

  /**
   * 页面的初始数据
   */
  data: {
    duration: 800,//动画时间
    minusStatus: 'disabled'
  },

  ticketMarket: function(e) {
    wx.navigateTo({
      url: '/pages/apply_enter_weizhen/ticket_market/ticket_market',
    })
  },

  // 红包领取
  setModalStatus0: function (e) {
    console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.statustwo);
    var animation = wx.createAnimation({
      duration: 388,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.statustwo == 1) {
      this.setData(
        {
          showModalStatus0: true
        }
      );
    }
    /* 抽屉弹出动画 */
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.statustwo == 0) {
        this.setData(
          {
            showModalStatus0: false
          }
        );
      }
    }.bind(this), 200)
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