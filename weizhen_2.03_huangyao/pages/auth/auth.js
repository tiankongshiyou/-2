//index.js
/**通过code换取后台的用户信息，流程如下
 * 因为传递后台所需要的参数有userInfo和code两个来源途径的参数，所以需要通过两个途径去获取
 * code只能通过wx.login获取，userInfo通过授权后getUserInfo获取、点击授权按钮后直接获取
 * 1.onload方法初始化userInfo值
 * 2.getUserInfo点击授权按钮，检查是否有缓存用户全局变量userRole，用返回值更新用户的userInfo，调用获取后台授权方法getUserRole
 * 3.getUserRole调起wx.login方法，传递code和userInfo的参数去后台，返回值res.body更新到用户全局缓存userRole
 */
//获取应用实例
const app = getApp()
Page({

    data: {
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
        var that = this;
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    //点击授权按钮，获取用户信息
    getUserInfo: function (e) {
        console.log('index.js--getUserInfo--获取参数',e);
        var that = this;
        if (wx.getStorageSync('userRole')) {
            wx.switchTab({
                url: '/pages/business/business',
            })
            return
        }
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
        if (e.detail.userInfo) {
            that.getUserRole();
        }
    },
    //请求后台，用code换取用户信息
    getUserRole: function () {
        wx.showLoading({
            title: '加载用户资料',
        });
        //调用登录接口
        var that = this;
        var Info = that.data.userInfo;
        wx.login({
            success: function (res) {
                //通过code获取用户信息，并且保存到全局变量里面
                var code = res.code;
                var userData = {
                    code: code,
                    wxImg: Info.avatarUrl,
                    address: Info.province + "-" + Info.city,
                    sfsq: Info.gender,
                    language: Info.language,
                    wxNc: Info.nickName,
                }
                app.util.getPort('login_get_user_by_code',app,userData,function(res){
                    console.log('index.js--getUserRole方法--wx.login方法--登陆信息=>',userData);
                    console.log('index.js--getUserRole方法--wx.login方法--通过code换取用户信息=>',res);
                    wx.hideLoading();
                    app.globalData.userRole = res.data.body;
                    wx.setStorageSync('userRole', res.data.body);
                    wx.switchTab({
                        url: '/pages/business/business',
                    })
                })
            }
        })
    }
})
