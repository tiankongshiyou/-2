// pages/business/business.js
/**
 * 首页渲染流程如下
 * 1.初始化动画参数和文件地址前缀
 * 2.获取用户地理位置，初始化三级联动选择框和所在地址
 * 3.获取店铺分类，显示所有的店铺分类
 * 4.获取轮播图，轮播是用get形式请求的
 *
 * 相关事件
 * 点击跳转，根据不同的元素的data-url属性，和携带的data-id参数，跳转到对应的的页面
 * 点击类别，重新加载分类下的数据，
 * 三级联动，选择省市区的数据
 */
var app = getApp();
Page({
    /**
    * 页面的初始数据
    */
    data: {
    topper: false,
    showList: false,
    animate_one: false,
    animate_two: false,
    animate_three: false,
    animate_four: false,
    cur_class: 0,
    all_cate_page:[],
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
    wx.showLoading({title:'加载中'});
    //开始动画,初始化图片前缀
    this.setData({
        animate_one:true,
        image_prefix_host:app.image_prefix_host,
    });
    //初始化地理位置
    this.getLocationInitRegionData();
    //获取分类
    this.getClass();
    //获取轮播
    this.carousel();
    },
    //获取店铺分类
    getClass: function () {
      var that = this;
      app.util.getPort('index_get_shop_category',app,{},function(e){
          if (e.data.body != null && e.data.body != undefined) {
              that.setData({
                  classes: e.data.body,
              })
          }
      },function(e){
          wx.showToast({
              title: '分类获取失败'
          })
      },function(e){
          wx.hideLoading();
      });
    },
    //获取轮播图
    carousel: function () {
      var that = this;
      app.util.getPort('index_get_banner',app,{method:'GET',dataType: "json"},function(e){
          if (e.data.body != null && e.data.body != undefined) {
              that.setData({
                  carousel: e.data.body
              })
          }
      },function(e){
          wx.showToast({
              title: '轮播图获取失败'
          })
      },function(e){
          wx.hideLoading();
      });
    },
    //获取定位对应的省市区，初始化到data.region里面
    getLocationInitRegionData() {
    var that = this;
    app.util.getLocation(function(res,source){
        var region = [];
        region[0] = res.province;
        region[1] = res.city;
        region[2] = res.district;
        that.setData({
            region: region,
            longitude: source.location.lng,
            latitude: source.location.lat,
        })
    });
    },
    // 根据元素属性url,跳转到其他页面
    jumpOtherUrl: function (e) {
    var id = e.currentTarget.dataset.id;
    var url = e.currentTarget.dataset.url;
    var types = e.currentTarget.dataset.type;
    if (url == "search") {
      wx.navigateTo({
        url: '/pages/shop_detail/search_shop/search_shop',
      })
    } else if (url == "shop_detail") {
      wx.navigateTo({
        url: '/pages/shop_detail/shop_detail?shopid='+id,
      })
    } else if (url == "new_or_hot_shop"){
      wx.navigateTo({
        url: '/pages/shop_detail/new_or_hot_shop/new_or_hot_shop?type=' + types,
      })
    }
    },
    //选择类别加载不同的店铺
    tap_class: function (e) {
    var that = this;
    var choose_category_index =e.currentTarget.dataset.class_id;
    wx.showLoading({title:'获取店铺信息中'});
    var push_category_data ={
        'shopCategoryId':choose_category_index
    };
      app.util.getPort('get_shop_list_by_category',app,push_category_data,function(e){
          if (e.data.body != null && e.data.body != undefined) {
              wx.hideLoading();
              that.setData({
                  shopList:e.data.body,
                  cur_class:choose_category_index,
              })
          }
      },function(e){
          wx.showToast({
              title: '分类下店铺获取失败'
          })
      },function(e){
          wx.hideLoading();
      });
    },
    //从所有的类别里面选择一个分类，渲染该分类下的店铺
    all_cate_tap_one: function (e){
      //隐藏所有分类菜单
      var that = this;
      var cur_class = e.currentTarget.dataset.class_id;
      that.setData({showList: false});
      if(cur_class !== '0'){
          that.tap_class(e);
      }else{
          console.warn('click');
          that.getPageAroudShops(cur_class);
      }
    },
    //省市区联动选择器
    bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
    },
    //显示list
    show_whole_class: function () {
    var that = this;
    that.setData({
      showList: !that.data.showList
    })
    },
    //回到顶部
    goto_top: function (e) {
    this.setData({
      scrollTop: 0
    })
    },
    //滚动事件
    onScroll: function (e) {
    var that = this;
    var scrollTop = e.detail.scrollTop;
    if (scrollTop > 60 && !that.data.topper) {
      that.setData({
        topper: true
      })
    } else if (scrollTop < 60 && that.data.topper) {
      that.setData({
        topper: false
      })
    }
    if (scrollTop > 150 && !that.data.animate_two) {
      that.setData({
        animate_two: true
      })
    }
    if (scrollTop > 350 && !that.data.animate_three) {
      that.setData({
        animate_three: true
      })
    }
    if (scrollTop > 650 && !that.data.animate_four) {
      that.setData({
        animate_four: true
      })
    }
    },
    //不同的分类下加载更多数据
    loadMore: function () {
        wx.showToast({
            title: '加载更多中',
            icon: "loading",
            duration : 1000
        })
        var that = this;
        var curId = that.data.activeIndex;
        var curPage = that.data.curPage + 1;
        that.setData({
            curPage: curPage
        })
        if (curId == 0) {
            setTimeout(function(){

                wx.request({
                    url: addr + "/wx/shops/queryShops",
                    data: {
                        type: 0,
                        jd: that.data.longitude,
                        wd: that.data.latitude,
                        curPage: curPage
                    },
                    header: {
                        "content-type": "json"
                    },
                    success: function (res) {
                        var shopList = res.data.body;
                        if (shopList.length != 0 && shopList != null) {
                            for (let i = 0; i <= shopList.length - 1; i++) {
                                shopList[i].shopRemark = shopList[i].shopRemark.substring(0, 6) + '...';
                                shopList[i].shopAddr = shopList[i].shopAddr.substring(0, 15) + '...';
                            }

                            that.setData({
                                shopList: that.data.shopList.concat(shopList)
                            })
                        } else {
                            wx.showToast({
                                title: '没有啦',
                            })
                        }
                    }
                });
            },500)
        } else {
            setTimeout(function () {
                wx.request({
                    url: addr + "/wx/shops/queryShops",
                    data: {
                        type: curId,
                        curPage: curPage
                    },
                    header: {
                        "content-type": "json"
                    },
                    success: function (res) {

                        var shopList = res.data.body;

                        if (shopList.length != 0 && shopList != null) {
                            for (let i = 0; i <= shopList.length - 1; i++) {
                                shopList[i].shopAddr = shopList[i].shopAddr.substring(0, 15) + '...';
                            }
                            that.setData({
                                shopList: that.data.shopList.concat(shopList)
                            })
                        }else{
                            wx.showToast({
                                title: '没有啦',
                            })
                        }
                    }
                })
            }, 500)

        }
    },
    getPageAroudShops: function (curId) {
        wx.showLoading({title:'获取更多列表'});
        var that = this;
        var curPage = that.getCatePageIndex(curId);
        var push_category_data ={
            type: 1,
            // jd: that.data.longitude,
            // wd: that.data.latitude,
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
                    // that.setData({
                    //     shopList: that.data.shopList.concat(shopList)
                    // })
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

})