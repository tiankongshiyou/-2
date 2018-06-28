const app = getApp()
var addr = app.globalData.addr
var cdnaddr = app.globalData.cdnaddr
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 优惠券动画事件
    duration: 200,
    if_show:false,
    scale : 16,
    show_share:false,
    scrollTop: 100,
    
    searchSongList: [], 
    isFromSearch: true,    
    searchPageNum: 1,    
    callbackcount: 10, 
    searchLoading: false,
    searchLoadingComplete: false 
  },

  setModalStatus0:function(e){
    console.log("完成")
    console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.statusone);
    const animation = wx.createAnimation({
      duration: this.data.duration,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.statusone == 1) {
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
      if (e.currentTarget.dataset.statusone == 0) {
        this.setData(
          {
            showModalStatus0: false
          }
        );
      }
    }.bind(this), 200)
  },
  // 自定义弹出框
  setModalStatus: function (e) {
    console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.statustwo);
    const animation = wx.createAnimation({
      duration: this.data.duration,
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
          showModalStatus: true
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
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  },


  collect:function(e){
    var that= this;
    if (that.data.collected == 0){
      that.setData({
        collected : 1
      })
      console.log(that.data.collected);
      that.changeCollect(that.data.openid, that.data.shopid, that.data.collected);
      wx.showToast({
        title: '收藏成功',
      })
   }else{
      that.setData({
        collected: 0
      })
      console.log(that.data.collected);
      that.changeCollect(that.data.openid, that.data.shopid, that.data.collected);
      wx.showToast({
        title: '取消收藏成功',
      })
   }
  },
  //修改收藏状态
  changeCollect: function (openid, shopsid, ifdefault) {
    var that = this;
    wx.request({
      url: addr + '/wx/shops/updateCollect',
      header: {
        "content-type": "json"
      },
      data: {
        openid: openid,
        shopsid: shopsid,
        ifdefault: ifdefault
      },
      success: function (e) {
        console.log(e);
      }
    })
  },
  //分享二维码控制
  control_share:function(){
    this.setData({
      show_share : !this.data.show_share
    })
  },
  //保存图片到本地相册
  saveTheImg: function () {
    var img_url = cdnaddr + this.data.two_d;
    console.log(img_url);
    wx.downloadFile({
      url: img_url,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (ops) {
    var that = this;
    console.log(ops)
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: that.data.shop_detail.shopName,
      desc: '微阵联盟',
      path: 'pages/index/index?shopid=' + that.data.shop_detail.id,
      imageUrl: cdnaddr + that.data.shop_detail.shopPic,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  
  
  /**
   * 根据传入的shopid，查找对应的店铺详情，初始化信息
   */
  onLoad: function (options) {
    console.log("shop_detail.js--onLoad方法--该店铺的ID=>" ,options.shopid);
    var that = this;
    var shopid = options.shopid;
    // wx.showLoading({title: '加载中'});
    that.setData({
      openid:app.globalData.userRole.wxOpenid,
      cdnaddr : app.image_prefix_host,
      shopid: shopid
    });
    that.getShopInfo(shopid);
  },
  //获取商铺详情
  getShopInfo: function (shopid) {
      var that = this;
      var push_data ={
          shopid: shopid,
          openid: app.globalData.userRole.wxOpenId
      };
      app.util.getPort('get_shop_detail_by_id',app,push_data,function(e){
        app.globalData.userRole = e.data.body;
          if (e.data.body != null && e.data.body != undefined) {
              wx.hideLoading();
              that.setData({
                  shop_detail: e.data.body,
                  collected: e.data.body.shosCollect
              })
          }
      },function(e){
          wx.showToast({
              title: '店铺不存在',
          })
      },function(e){
          that.getGoodsInfo(shopid);
      });
  },
  //获取商品列表
  getGoodsInfo: function (shopid){
    var that = this;
      app.util.getPort('get_shop_good_by_id',app,{shopid: shopid},function(e){
          if (e.data.body != null && e.data.body != undefined) {
              that.setData({
                  good_list: e.data.body,
              })
          }
      },function(e){
          wx.showToast({
              title: '没有找到对应的商品列表',
          })
      },function(e){
          that.getComments(shopid);
      });
  },
  //获取商铺评论
  getComments: function (shopid) {
    var that = this;
    app.util.getPort('get_shop_commets_by_id',app,{shopid: shopid},function(e){
        if (e.data.body != null && e.data.body != undefined) {
            that.setData({
                comment_list: e.data.body,
            })
        }
    },function(e){
        wx.showToast({
            title: '没有找到对应的评论列表',
        })
    },function(e){
        that.getQrcode(shopid);
    });
  },
  //获取店铺二维码
  getQrcode: function (shopid) {
    var that = this;
    app.util.getPort('get_shop_qrcode_by_id',app,{shopsid:shopid,openid: app.globalData.userRole.wxOpenId},function(e){
        if (e.data.body != null && e.data.body != undefined) {
            that.setData({
                two_d: e.data.body,
            })
        }
    },function(e){
        wx.showToast({
          title: '没有找到对应的二维码',
        })
    },function(e){
        wx.hideLoading();
    });
  },
  
  Qrcode: function (e) {
    console.log('二维码的二维码',+e)
  },

  //地图组件
  find_shop: function(e){
    this.setData({
      if_show: !this.data.if_show
    })
  },
  //放大地图
  plus_map:function(){
    if (this.data.scale <= 30){
      this.setData({
        scale: ++this.data.scale
      })
    }else{
      return;
    }
  },
  //缩小地图
  minus_map: function () {
    if (this.data.scale >= 16){
      this.setData({
        scale: --this.data.scale
      })
    }else{
      return
    }
    
  },
  //电话
  call_shop:function(){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.shop_detail.shopTel
    })
  },
  //跳转到商品
  goto_goods:function(){
    wx.navigateTo({
      url: '/pages/goods/goods?shopid='+that.data.shopid,
    })
  },
  //跳转到店铺评价
  goto_shop_comments:function(){
    var that =this;
    wx.navigateTo({
      url: '/pages/shop_detail/shop_comments/shop_comments?shopid='+that.data.shopid,
    })
  },
  
  //优惠券分页
  keywordSearch: function (e) {
    this.setData({
      searchPageNum: 1,    
      searchSongList: [],  
      isFromSearch: true,   
      searchLoading: true,   
      searchLoadingComplete: false 
    })
    this.fetchSearchList();
  },
  //滚动到底部触发事件  
  searchScrollLower: function () {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
        isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      that.fetchSearchList();
    }
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.onScroll = 1
    this.onScroll('正在刷新数据')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.onScroll('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

})