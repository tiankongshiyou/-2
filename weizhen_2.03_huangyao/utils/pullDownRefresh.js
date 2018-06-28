/**
 * 下拉刷新分页数据
 * @param app 全局app
 * @param that 当前页面Page this指向
 * @param url 请求接口
 * @param fn 回调函数 function
 * @param categoryId 分类 object
 */
//分页id 页数 总页数 接口地址 
function pullDownRefresh(app,that,url,categoryId,fn){
    app.util.getPort(url,app,categoryId,function(res){
      	if(res.data.code == 1){
	        //获取总页数
	        var totalPages = res.data.result.ajax_page.totalPages
	        that.setData({
	          	'totalPages':totalPages
	        })
	        var totalPages = that.data.totalPages
	        //获取当前页数
	        var page = that.data.page

	        if(page < totalPages){
	          	page ++
		        that.setData({
		          	'page':page
		        })
	        }else{
	          	app.util.openToastSuccess('没有了','none')
	          	wx.stopPullDownRefresh()
	          	return
	        }

	        if(categoryId){
	        	categoryId.p = page
	        	var data = categoryId
	        }else{
		        var data = {
		          	'p':page
		        }	        	
	        }
	        app.util.getPort(url,app,data,function(res){
	          	fn(res);
	          	wx.stopPullDownRefresh()
	        })
      	}
    })
}
module.exports = pullDownRefresh