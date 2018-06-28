//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showList: false,
    animate_one: false,
    animate_two: false,
    animate_three: false,
    animate_four: false,
    cur_class: 0,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中' });
    //开始动画,初始化图片前缀
    this.setData({
      animate_one: true,
      image_prefix_host: app.image_prefix_host,
    });
    //获取分类
    this.getClass();
  },
  //获取店铺分类
  getClass: function () {
    var that = this;
    app.util.getPort('index_get_shop_category', app, {}, function (e) {
      if (e.data.body != null && e.data.body != undefined) {
        console.log('business.js--getClass方法--获取首页分类=>', e.data.body);
        that.setData({
          classes: e.data.body,
        })
      }
    }, function (e) {
      wx.showToast({
        title: '分类获取失败'
      })
    }, function (e) {
      wx.hideLoading();
    });
  },
  //选择类别加载不同的店铺
  tap_class: function (e) {
    var that = this;
    var choose_category_index = e.currentTarget.dataset.class_id;
    wx.showLoading({ title: '获取店铺信息中' });
    var push_category_data = {
      'shopCategoryId': choose_category_index
    };
    app.util.getPort('get_shop_list_by_category', app, push_category_data, function (e) {
      if (e.data.body != null && e.data.body != undefined) {
        console.log('business.js--tap_class方法--获取店铺分类下的列表=>', e.data.body);
        that.setData({
          shopList: e.data.body,
          category_index: choose_category_index,
          cur_class: choose_category_index,
        })
      }
    }, function (e) {
      wx.showToast({
        title: '分类下店铺获取失败'
      })
    }, function (e) {
      wx.hideLoading();
    });

    var cur_class = e.currentTarget.dataset.class_id;
    that.setData({
      cur_class: cur_class,
      scrollTop: 0
    });
  },
  //显示list
  show_whole_class: function () {
    var that = this;
    that.setData({
      showList: !that.data.showList
    })
  },

  onShow: function () {
    this.setData({
      animate_one: true
    })
  },

  onHide: function () {
    this.setData({
      animate_one: false,
      showList: false,
      animate_two: false,
      animate_three: false,
      animate_four: false,
      scrollTop: 0
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