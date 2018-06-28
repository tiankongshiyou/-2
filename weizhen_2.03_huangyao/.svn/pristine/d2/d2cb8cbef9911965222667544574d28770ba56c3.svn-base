/**
 * 根据用户uid获取用户信息,并设置用户信息
 * @param {object} [app] [全局App]
*/
function getUserById(app){
  app.util.getPort('get_user_by_id',app,{},function(res){
    if (res.data.code == 1) {
      var userinfo = res.data.result;
      app.globalData.roleId = userinfo.role_id;
      app.globalData.isVerifty = userinfo.is_verifty;
    }
  })
}
/**
 * 获取用户实名认证/律师认证状态码
 * @param {object} [app] [全局App]
*/
function getUserVerifyCode(app){
  app.util.getPort('user_is_verify',app,{},function(res){
    if(res.data.code == 1){
      console.log("check_status=",res.data.result.chcek_status);
      app.globalData.userVerifyCode = res.data.result.chcek_status
    }
  })
}

/**
 * 获取用户实名认证/律师认证状态码
 * @param {object} [app] [全局App]
*/
function getVerifyLawyerCode(app){
  app.util.getPort('lawyer_is_verify',app,{},function(res){
    if(res.data.code == 1){
      app.globalData.lawyerVerifyCode = res.data.result.chcek_status
    }
  })
}

module.exports = {
  getUserById:getUserById,
  getUserVerifyCode:getUserVerifyCode,
  getVerifyLawyerCode:getVerifyLawyerCode
}