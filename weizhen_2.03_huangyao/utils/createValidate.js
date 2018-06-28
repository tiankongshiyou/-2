
/**
 * 创建表单验证实例 并对表单进行验证
 * wxValidate 构造函数
 * rules 验证字段的规则
 * messages 验证字段的提示信息，若不传递调用默认的信息
 * e 包含表单字段信息
 * return 是否通过验证 object
*/
function createValidate(app,rules,messages,e){
	const wxValidateObj = new app.util.wxValidate(rules,messages)
	return {
		isValidate:wxValidateObj.checkForm(e),
		msg:wxValidateObj.errorList[0]
	}
}

module.exports = createValidate