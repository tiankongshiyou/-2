var app = getApp();
// pages/new_or_hot/new_or_hot.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[],
    all_cate_page:[],
    page_type:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var get_page_type = 1;
    console.log(options.type);
    let shop_type = options.type;
    if (shop_type == "new"){
      wx.setNavigationBarTitle({
        title: '新驻商家',
      })
    } else if (shop_type == "hot"){
      wx.setNavigationBarTitle({
        title: '人气商家',
      })
        get_page_type =2;
    }
   this.setData({
       page_type:get_page_type,
       image_prefix_host:app.image_prefix_host,
   });
    this.getPageAroudShops(get_page_type);
  },
  
  getNeworhotshop: function (type){
    var that = this;
    app.util.getPort('get_new_or_hot_shop', app, {type : type},function(e){
      if(e.data.body != null && e.data.body != undefined){
        console.log('没有找到=>',e.data.body);
        that.setData({
          new_or_hot_shop : e.data.body,
        })
      }
    }, function(){
      wx.showToast({
        title: '没有找到店铺',
      })
    },function(){
      wx.hideLoading();
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
  getPageAroudShops: function (curId) {
      wx.showLoading({title:'获取更多列表'});
      var that = this;
      var curPage = that.getCatePageIndex(curId);
      var push_category_data ={
          type: that.data.page_type,
          curPage: curPage,
      };
      app.util.getPort('get_shop_list_by_type',app,push_category_data,function(res){
          wx.hideLoading();
          if (res.data.body != null && res.data.body != undefined) {
              var shopList = res.data.body;
              if (shopList.length != 0 && shopList != null) {
                  for (let i = 0; i <= shopList.length - 1; i++) {
                      shopList[i].shopRemark = shopList[i].shopRemark.substring(0, 6) + '...';
                      shopList[i].shopAddr = shopList[i].shopAddr.substring(0, 15) + '...';
                  }
                  console.log('all shop on here',shopList);
                  that.setData({
                      shopList: that.data.shopList.concat(shopList)
                  })
              } else {
                  wx.showToast({
                      title: '没有啦',
                  })
              }
          }
      },function(e){
          wx.showToast({
              title: '分类下暂无店铺'
          })
      },function(e){
          wx.hideLoading();
      });
  },
  getCatePageIndex: function (cateIndex) {
      var that =this;
      var cate_key_name =  'cate_'+cateIndex;
      var get_all_cate_page = that.data.all_cate_page;
      if(get_all_cate_page[cate_key_name]){
          get_all_cate_page[cate_key_name] = get_all_cate_page[cate_key_name] + 1;
      }else{
          get_all_cate_page[cate_key_name] = 1;
      }
      that.setData({
          all_cate_page: get_all_cate_page
      })
      return get_all_cate_page[cate_key_name];
  },
  loadMore: function () {
    console.log('up up');
    var that =this;
    that.getPageAroudShops(that.data.page_type);
  },
  onScroll: function (e) {
        if (e.detail.scrollTop > 20 && !this.data.scrollDown) {
            this.setData({
                scrollDown: true
            });
        } else if (e.detail.scrollTop < 20 && this.data.scrollDown) {
            this.setData({
                scrollDown: false
            });
        }
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