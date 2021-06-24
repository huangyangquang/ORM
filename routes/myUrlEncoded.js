const qs = require('querystring')

module.exports = (req, res, next) => {
	console.log('content-type:', req.headers['content-type'])
	if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
		// 自行解析消息体
		let res = ''

		req.on('data', (chunk) => {
			res += chunk.toString('utf-8')
		})

		req.on('end', () => {
			const query = qs.parse(res)
			console.log(query)

			req.body = query
			next()
		})

	} else {
		next();
	}
}

// 写成可配置的，改为一个高阶函数：
exports.urlencoded = (options = {}) => {
	options.type = options.type || 'application/x-www-form-urlencoded'
	if(req.headers['content-type'] === options.type) {
		// 自行解析消息体
		let res = ''

		req.on('data', (chunk) => {
			res += chunk.toString('utf-8')
		})

		req.on('end', () => {
			const query = qs.parse(res)
			console.log(query)

			req.body = query
			next()
		})

	} else {
		next();
	}
}


