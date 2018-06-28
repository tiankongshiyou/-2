/**
 * 将阿拉伯数字转化为中文数字
 * @param {string/number} [num] [包含阿拉伯数字的字符串/数字]
 * @return {string} [转化成中文数字的字符串]
 */

function toChineseNum(num){
	var arrTmp = num.toString().split('')
	for(var i = 0 ;i<arrTmp.length;i++){
		var item = Number(arrTmp[i])
		if(isNaN(item)){
			continue
		}else{
			for(var key in numMap){
				if(item == key){
					arrTmp[i] = numMap[key]
					break
				}
			}
		}
	}
	return arrTmp.join('')
}
var numMap = {
	0:'〇',
	1:'一',
	2:'二',
	3:'三',
	4:'四',
	5:'五',
	6:'六',
	7:'七',
	8:'八',
	9:'九'
}
module.exports = toChineseNum