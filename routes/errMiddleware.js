// 处理错误的中间件

module.exports = (err, req, res, next) => {
	console.log('baseUrl：' + req.baseUrl) 
	if(err) {
		const errObj = {
			code: 500,
			msg: err instanceof Error ? err.message : err,
		}
		res.status(500).send(errObj)
	} else {
		next()
	}
}

