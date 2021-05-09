// 请求静态资源处理中间件

module.exports = (req, res, next) => {
	if(req.path.startsWith('/api')) {
		// 请求的是 api 接口
		next()
	} else {
		if('静态资源存在') {
			// 请求静态资源
			res.send('静态资源')
		} else {
			next()
		}
	}
}




