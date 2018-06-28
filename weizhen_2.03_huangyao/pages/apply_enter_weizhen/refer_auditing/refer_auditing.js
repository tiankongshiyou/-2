var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  auditingSuccess: function(e) {
  wx.navigateTo({
    url: '/pages/apply_enter_weizhen/auditing_success/auditing_success',
  })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseImage: function (e) {
    console.log(e);
    var that = this;
    //用户openId的获取
    var openid = app.globalData.userRole.wxOpenId;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths[0]);
        var photoPath = res.tempFilePaths[0];
        that.setData({
          photo: photoPath
        })
      }
    })
  },
  submit: function (e) {
    var that = this;
    wx.uploadFile({
      url: 'https://www.worldwz.com/api' + '/wx/shops/uploadAudit',
      filePath: that.data.photo,　//待上传的图片，由 chooseImage获得
      name: 'file',
      formData: {
        openid: app.globalData.userRole.wxOpenId
      },
      success: function (res) {
        console.log("get param=>", res);
        var jsonData = JSON.parse(res.data);
        console.log(jsonData);
        if (jsonData.code == '200') {
          wx.navigateTo({
            url: '/pages/apply_enter_weizhen/auditing_success/auditing_success',
          })
        } else {
          console.log("get fail", res);
          wx.showToast({
            title: '服务器打盹',
          })
        }
        that.setData({
          readyImg: jsonData.body.pic_path,
        })
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