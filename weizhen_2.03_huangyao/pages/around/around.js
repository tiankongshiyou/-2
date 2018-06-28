/**
 * 获取当前坐标
 * 请求后台所有商家
 * 然后根据计算，把当前经纬度为中心周围5km的商家渲染到地图上
 */
var app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var Map;
Page({
  data: {
    scale: 14,
    latitude: "",
    longitude: "",
    markers: [],
    circles: [],
    area: '定位中',
    region: ['湖南省', '长沙市', '望城区'],
  },
  //地图的视野产生变化时绑定的回调，暂时没用到
  bindRegionChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value[2])
    var area = e.detail.value[2];
    area = area.slice(0, 3);
    this.setData({
      region: e.detail.value,
      area: area
    })
    console.log(this.data.region[0] + this.data.region[1] + this.data.region[2])
    Map.geocoder({
      address: this.data.region[0] + this.data.region[1] + this.data.region[2],
      success: function (res) {
        console.log(res.result.location.lat, res.result.location.lng);
        that.getMakers(res.result.location.lat, res.result.location.lng);
        that.setData({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  //跳转到搜索店铺页
  goto_search: function () {
    wx.navigateTo({
      url: '/pages/shop_detail/search_shop/search_shop',
    })
  },
  /**工具函数
   * 根据传入的用户当前经纬度，把本地保存的所有商家进行排序计算，五公里内的商家markers信息标记在地图上
    * @param weidu  当前用户的维度
   * @param jingdu  当前用户的精度
   */
  getMakers: function (weidu, jingdu) {
    var that = this;
    var canVisible = [];
    if (that.data.markersData == undefined || that.data.markersData == null) {
      return
    }
    for (var i = 0; i <= that.data.markersData.length - 1; i++) {
      var a = this.toTheRad(that.data.markersData[i].latitude);
      var a1 = this.toTheRad(weidu);
      var deltaA = a - a1;
      var b = this.toTheRad(that.data.markersData[i].longitude);
      var b1 = this.toTheRad(jingdu);
      var deltaB = b - b1;
      var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaA / 2), 2) + Math.cos(a) * Math.cos(a1) * Math.pow(Math.sin(deltaB / 2), 2)));
      distance = distance * 6378137.0;
      distance = Math.round(distance * 10000) / 10000;
      if (distance <= 5000) {
        canVisible.push(that.data.markersData[i]);
      }
    }
    this.setData({
      markers: canVisible
    })
  },
  //弧长转换公式，计算五公里范围需要
  toTheRad: function (d) {
    return d * Math.PI / 180.00;
  },
  //定位按钮，重新定位到目前的位置
  position: function () {
    this.mapCtx.moveToLocation();
  },
  //重新加载当前数据
  reload: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //获取五公里内联盟商家信息
        that.getMakers(res.latitude, res.longitude)  //当前经纬度传入5公里工具函数 显示5公里商家
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 14,
        })
      }
    });
  },
  //拖动地图触发，重新加载周围5km的店家到地图
  region(e) {
    if (e.type === 'end') {
      this.getLngLat()
    }
  },
  //获取中间点周围5km的微阵联盟商家，渲染到地图
  getLngLat: function () {
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.getAroundShops(res.latitude, res.longitude);
      }
    })
  },

  //点击店铺的定位小图标
  markertap: function (e) {
    var shopid = e.markerId;
    wx.navigateTo({
      url: '/pages/shop_detail/shop_detail?shopid=' + shopid,
    })
  },
  //页面初始化加载函数
  onLoad: function (options) {
    var that = this;
    console.log(that.data)
    wx.showLoading({ title: '加载中' });
    app.util.getLocation(function (format, res) {
      var latitude = res.location.lat;
      var longitude = res.location.lng;
      //获取五公里内联盟商家信息
      that.getMakers(latitude, longitude);   //当前经纬度传入5公里工具函数 显示5公里商家
      that.setData({
        latitude: latitude,
        longitude: longitude,
      });
      that.getTrueLocation(latitude, longitude);
      wx.hideLoading();
    });
    //创建地图组件，同时初始化显示周边店铺
    Map = new QQMapWX({ key: 'ULNBZ-DOWHF-HW5J5-J6J2I-UDC6H-JDFJS' });
    this.mapCtx = wx.createMapContext("map");
    if (!that.data.markersData) {
      that.getAroundShops();
    }
  },
  /**
   * 获取附近所有商家数据，初始化到地图的markers里面，显示在地图上
    */
  getAroundShops: function (jd, wd) {
    console.log(jd, wd)
    var that = this;
    wx.request({
      url: "http://192.168.1.122:8080/weizhen" + '/wx/shops/multiQueryShopInfo',
      method: "post",
      dataType: "json",
      data: {
        jd: jd,
        wd: wd,
      
      },
      success:function(res){
        console.log(res,"----------------------------------res")
        var markersData = [];
        if (res.data.body) {
          var addrInfo = res.data.body;
          for (let i = 0; i <= addrInfo.length - 1; i++) {
            markersData.push({
              id: addrInfo[i].id,
              title: addrInfo[i].shopName,
              latitude: addrInfo[i].shopWd,
              longitude: addrInfo[i].shopJd,
              width: "50",
              height: "50",
              iconPath: "/img/around/shop.png",
              callout: {
                content: addrInfo[i].shopName,
                display: 'ALWAYS',
                textAlign: 'center',
                padding: 20,
                borderRadius: 5,
                padding: 3,
                bgColor: '#FFFFFF',
              },
            })
          };
          that.setData({
            markersData: markersData
          })
        }
      }, function(e) {
        wx.showToast({
          title: '网络错误',
        })
      }, function(e) {
        wx.hideLoading();
      }
      
    })
    // app.util.getPort('get_all_shop', app, { jd: jd, wd: wd, type: 0, dataType: "json" }, function (res) {
    //   console.log(res, "///////////////////////////////res")
    //   var markersData = [];
    //   if (res.data.body) {
    //     var addrInfo = res.data.body;
    //     for (let i = 0; i <= addrInfo.length - 1; i++) {
    //       markersData.push({
    //         id: addrInfo[i].id,
    //         title: addrInfo[i].shopName,
    //         latitude: addrInfo[i].shopWd,
    //         longitude: addrInfo[i].shopJd,
    //         width: "50",
    //         height: "50",
    //         iconPath: "/img/around/shop.png",
    //         callout: {
    //           content: addrInfo[i].shopName,
    //           display: 'ALWAYS',
    //           textAlign: 'center',
    //           padding: 20,
    //           borderRadius: 5,
    //           padding: 3,
    //           bgColor: '#FFFFFF',
    //         },
    //       })
    //     };
    //     that.setData({
    //       markersData: markersData
    //     })
    //   }
    // }, function (e) {
    //   wx.showToast({
    //     title: '网络错误',
    //   })
    // }, function (e) {
    //   wx.hideLoading();
    // });
  },
  //通过经纬度换算自己的省市区定位，更新到数据里面来
  getTrueLocation(lat, lng) {
    // 实例化API核心类
    var that = this;
    Map.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lng
      },
      success: function (res) {
        var address = res.result.address_component;
        var region = [];
        region[0] = address.province;
        region[1] = address.city;
        region[2] = address.district;
        that.setData({
          region: region,
          area: region[2]
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '网络链接错误',
        })
      },
      complete: function (res) {
      }
    });
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