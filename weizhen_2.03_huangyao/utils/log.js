/**
 * 所有的日志打印，统一请求这里，输出后打印
 */

/**
 * print_log    需要打印的日志  默认字符串类型
 * log_addition 打印补充信息	 默认字符串类型
 * log_rank		打印信息等级	1:最高级 2:中级 3:低级
 */
function print_log (print_log ='',log_addition ='',log_rank =''){
	if(log_addition ==''){
        console.log(print_log);
    }else{
        console.log(log_addition+'=>',print_log);
	}
}

module.exports = {
	print_log:print_log,
}