/**
 * 获取当前时间 并格式化
 * date new Date() 
 * separator 分隔符 string
 * bool 是否显示并格式化时分秒
*/ 
function formatTime (date, separator,bool) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  if(bool){
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join(separator) + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  return [year,month,day].map(formatNumber).join(separator)
}

function getDate(date){
  const year = date.getFullYear()
  const month = (date.getMonth() + 1)[1]?(date.getMonth() + 1):'0'+(date.getMonth() + 1)
  const day = (date.getDate())[1]?(date.getDate()):'0'+(date.getDate())

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // const time = year+'年'+month +'月' +day+'日 ' + [hour, minute, second].map(formatNumber).join(':')
  const time = year+'年'+month +'月' +day+'日'
  return time
}

function formatNumber(n){
  n = n.toString()
  return n[1] ? n : '0' + n
}


function replace(str,o,arr){
  var len = 0
  var tmpStr = ''
  //str 字符串
  //o 被替换的字符
  //arr 替换之后的字符数组
  var r = function(str,o,arr){
    var index = str.indexOf(o)
    tmpStr = str.replace(str[index],arr[len]) 
    len ++
    if(len == arr.length-1){
        tmpStr += arr[len]
          r = null
          return 
      }
    r(tmpStr,o,arr)
    if(len == arr.length-1){
      return tmpStr
    }
  }
    return r(str,o,arr);
}

module.exports ={ 
  'formatTime':formatTime,
  'getDate':getDate,
  'replace':replace
};