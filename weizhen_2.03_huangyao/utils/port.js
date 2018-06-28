/**
 * 所有的请求统一通过这里，然后请求后台
 */
var port_json = {
	"addr": "https://www.worldwz.com/api",

	"cdnaddr": "https://file.worldwz.com",

	//登录获取用户信息
	"login_get_user_by_code": "/wx/memberscenter/queryCodeByMembers",

	//首页获取轮播图
	"index_get_banner": "/wx/system/getimg",
	//首页获取店铺分类
  "index_get_shop_category": "/wx/shops/queryShopCategory",
	//首页根据店铺分类获取对应列表
	"get_shop_list_by_category": "/wx/shops/categoryByQueryShops",

	//首页获取附近、新近、热门店铺的对应列表
	"get_shop_list_by_type": "/wx/shops/queryShops",


  //根据店铺id获取店铺详情
  "get_shop_detail_by_id": "/wx/shops/queryShopDetail",
  //根据店铺id获取店铺商品信息
  "get_shop_good_by_id": "/wx/shops/queryGoods",
  //获取店铺id获取店铺评论
  "get_shop_commets_by_id": "/wx/shops/queryShopComments",
  //获取店铺的二维码
  "get_shop_qrcode_by_id": "/wx/memberscenter/getQrcode",
  //获取所有的店铺信息
  "get_all_shop": "/wx/shops/queryShops",
  //我的评论
  "get_mycomments_by_id": "/wx/shops/queryUserComments",
  //校验提现密码
  "get_withdrawal_passwd": "/order/reflectPassword",
  //查看商品详情
  "get_shop_for_details_by_id": "/wx/shops/queryGoodsDetail",
  //优惠券
  "get_coupons_by_id": "/coupons/list",

  //设置提现密码
  "center_set_withdraw_password": "/money/set/password",
  //修改提现密码
  "center_revise_withdraw_password": "/order/updateReflectPassword",
  //提交审核资料(普通会员转商家)
  "apply_enter_weizhen_refer_auditing": "/wx/shops/uploadAudit",
  //提交审核资料(准商家准商家)
  "apply_enter_weizhen_target_auditing": "/wx/shops/uploadIdCard",
  //添加收货地址
  "goods_newly_increased": "/wx/smallfeature/addShippingAddress",
  //收货地址列表
  "goods_take_delivery": "/wx/smallfeature/queryShippingAddress",

  // 会员中心
  // 1.会员状态
  "center_center": "/wx/memberscenter/getQrcode",
  // 2.客服中心
  "center_online_chat": "/wx/smallfeature/commitConsulting",
  // 3.店铺收藏
  "center_shop_collect": "/wx/shops/queryShopsCollect",
  // 4.卡券包
  "center_center_cup": "/coupons/getCount",
  // 5.不同身份查询菜单
  "center_center":"/wx/memberscenter/getMembersMenu",
  //我的资产
  "center_property": "/money/info",
  //订单中心
  "order_center": "/order/page/list",


	/**
	 * 用户进行实名认证
	 * 请求参数  字符串格式 username    用户真实姓名
	 * 请求参数  字符串格式 idNo        用户身份证号
	 * 请求参数  字符串格式 phone       用户手机号
	 * 返回 布尔格式 is_verify      'ok':成功 'no':失败
	 */
	"verify_check":"User/Check/verify_check",

};

/**
 * 获取图片前缀域名,支持传入参数进行获取对应的地址
 */
function get_image_prefix_host (image_alias =''){
    if(image_alias ==''){
        return port_json['cdnaddr'];
    }else{
        return port_json[image_alias];
    }
}


/**
 * 传入接口名，返回请求地址
 * portname 接口名 string
 * app getApp() 全局app
 * upload_data 参数 object
 * callback 回调函数 function 
*/
function getPort (portname,app = {} ,upload_data = {},success_callback= '',fail_callback= '',complete_callback= ''){
	// var uid = app.globalData.userId
	// var token = app.globalData.token
	var requset_data = {};
	var requset_config = {};
	if(upload_data.method){
        requset_config.method =upload_data.method;
	}else{
        requset_config.method ='POST';
	}
    if(upload_data.dataType){
        requset_config.dataType =upload_data.dataType;
        requset_config.header ={
            "Content-Type": "json"
        };
    }else{
        requset_config.header ={
            "Content-Type": "application/x-www-form-urlencoded"
        };
	}
	for(var key in upload_data){
		if(key !== 'method' && key !== 'dataType'){
            requset_data[key] = upload_data[key];
		}
	}
	var requset_url = port_json['addr'] + port_json[portname];
	if (!requset_url){
			console.log('没有找到对应接口地址，检查参数');
	}else{
        requset_config.url =requset_url;
        requset_config.data =requset_data;
        requset_config.success =function (res) {
            if(res.data.code == 10086){
                app.onLaunch();
            }

            console.group(portname);
            console.log(portname+'接口请求参数'+'=>',requset_data);
            console.log(portname+'返回参数'+'=>',res);
            console.groupEnd();

            if (success_callback!=''){
                success_callback(res);
            }
        };
        requset_config.fail =function (res) {
            if (fail_callback!=''){
                fail_callback(res);
            }
		};
        requset_config.fail =function (res) {
            if (complete_callback!=''){
                complete_callback(res);
            }
		};
		wx.request(requset_config)
	}
}

/**
 * 上传图片
 * portname 接口名 string
 * success_call 上传成功后的回调函数
 * fail_call 上传失败后的回调函数
*/
function uploadImg (portname,app = {},success_call="",fail_call="") {
	var requset_url = port_json['host'] + port_json[portname];

	var uid = app.globalData.userId 
	var token = app.globalData.token
	var data = { uid:uid ,token:token } 
	wx.chooseImage({
		count: 1, // 默认9  
		sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
		sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有 
		success: function (res) {
			var tempFilePaths = res.tempFilePaths
			wx.uploadFile({
				url: requset_url, //仅为示例，非真实的接口地址
				filePath: tempFilePaths[0],
				name: 'file',
				formData:data,
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: function (res) {
					if(success_call != ""){
						success_call(res);
					}
				},
				fail: function (res) {
					if(fail_call != ""){
						fail_call(res);
					}
				},
			})
		}
	})
}


module.exports = {
	getPort:getPort,
	uploadImg:uploadImg,
    getImagePrefixHost:get_image_prefix_host
}