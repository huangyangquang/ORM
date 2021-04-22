// init.js:
// 在业务逻辑层的一些初始化操作

const validate = require('validate.js')
const moment = require('moment')

// validate上提供了一个extend方法，可以【全局】扩展验证器的功能：
// validate上有很多的验证器，我们这里就只是扩展了datetime的功能。
// 因为我传入的 birthday的值的格式 于我们的规则的格式 不统一，所以，需要提高扩展功能来保证两者的格式统一，内部才能进行规则判断。
// 我们对datetime扩展两个方法，一个是parse， 一个是format
validate.extend(validate.validators.datetime, {
	// parse, 这个函数会自动用于日期格式转换，他会在验证时，自动触发，他需要将任何数据转为时间戳返回，
	// 如果parse无法将数据转换为时间戳，就返回NaN
	// 参数：
	// value: 传入要验证的值（配置earlies， latest也会经过parse的转换）
	// options: 对某个属性的验证配置，比如是否为空...
	parse: function(value, options) {
		let formats = ['YYYY-MM-DD HH:mm:ss', 'YYYY-M-D H:m:s', 'x']
		if (options.dateOnly) {
			formats = ['YYYY-MM-DD', 'YYYY-M-D', 'x']
		} // 时间格式，判断是否需要时分秒

		return +moment.utc(value, formats, true) // 转换为时间戳
	},
	// 用于显示错误消息时，使用的显示字符串，【日期格式】作为显示的字符串的一部分
	// 参数如parse函数， value是一个时间戳
	format: function(value, options) {
		var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
	    return moment.utc(value).format(format);
	}
});