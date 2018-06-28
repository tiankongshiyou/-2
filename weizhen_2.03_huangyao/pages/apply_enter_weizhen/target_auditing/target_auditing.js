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

  },
  //获取真实姓名的value值
  userName: function (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  //获取身份证号码的value值
  identityCard: function (e) {
    console.log(e.detail.value)
    this.setData({
      identity: e.detail.value
    })
  },
  //上传身份证正面
  straightImage: function (e) {
    console.log(e);
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths[0]);
        var photoStraight = res.tempFilePaths[0];
        that.setData({
          straight: photoStraight
        })
        wx.uploadFile({
          url: "https://www.worldwz.com/api" + '/wx/shops/uploadAudit',
          filePath: photoStraight,　//待上传的图片，由 chooseImage获得
          name: 'file',
          formData: {
            //用户openId的获取
            openid: app.globalData.userRole.wxOpenId
          },
          success: function (res) {
            var jsonData = JSON.parse(res.data);
            console.log(jsonData);
            that.setData({
              readyImg1: jsonData.body.pic_path,
            })
          },
          fail: function (res) {
            console.log("addfood fail", res);
          },
        })
      }
    })
  },
  //上传身份证背面
  rebellionImage: function (e) {
    console.log(e, "******************************");
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths[0]);
        var photoRebellion = res.tempFilePaths[0];
        that.setData({
          rebellion: photoRebellion
        })
        wx.uploadFile({
          url: "https://www.worldwz.com/api" + '/wx/shops/uploadAudit',
          filePath: photoRebellion,　//待上传的图片，由 chooseImage获得
          name: 'file',
          formData: {
            //用户openId的获取
            openid: app.globalData.userRole.wxOpenId
          },
          success: function (res) {
            var jsonData = JSON.parse(res.data);
            console.log(jsonData);
            that.setData({
              readyImg2: jsonData.body.pic_path,
            })
          },
          fail: function (res) {
            console.log("addfood fail", res);
          },
        })
      }
    })
  },
  //提交按钮
  sumbit: function (e) {
    var that = this;
    var openid = app.globalData.userRole.wxOpenId;
    var name = that.data.name;//从data中获取用户的真实姓名的value值
    var identity = that.data.identity;//从data中获取用户的身份证号码的value值
    // var isIDCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$^/; //身份证正则表达式(15位) 
    var paper = /^|[0-9]|[a-z]|[A-Z]^/;//身份证号码的正则表达式(18位)
    var idcardList = [];//身份证
    idcardList[0] = that.data.readyImg1; //身份证正面
    idcardList[1] = that.data.readyImg2 //身份证背面
    if (name == "" || name == undefined || name == null) {
      wx.showToast({
        title: '姓名不能为空',
      })
      return
    } else if (identity == "" || identity == undefined) {
      wx.showToast({
        title: '身份证不能为空',
      })
      return
    } else if (identity.length < 15 || identity.length > 18) {
      wx.showToast({
        title: '位数不大于18',
      })
      return
    }
    else if (!paper.test(identity)) {
      wx.showToast({
        title: '身份证格式有误',
      })
      return
    }
    wx.request({
      url: "https://www.worldwz.com/api" + '/wx/shops/addAudit',
      data: {     //传递给后台的参数
        openid: openid,//openid的传递  
        tel: '15197735365',
        password: '123456',
        shopname: '收到付款',
        shopAddr: '天心区',
        licencePath: idcardList,
        licencePath: 1
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == '200') {
          wx.navigateTo({
            url: '/pages/apply_enter_weizhen/auditing_success/auditing_success',
          })
          // that.setData({

          // })
        } else {
          wx.showToast({
            title: '服务器打盹',
          })
        }
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