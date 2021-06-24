exports.getErr = function(err = 'server internal error', errCode = 500) {
	return {
		code: errCode,
		msg: err,
		data: null
	}
}

exports.getResult = function(result) {
	return {
		code: 0,
		msg: '',
		data: result
	}
}

exports.asyncHandler = (handler) => { // 传递一个异步函数进来
	return async (req, res, next) => { // 返回一个处理函数
		try {
			const result = await handler(req, res, next) // 调用异步函数，获取异步函数的结果
			res.send(exports.getResult(result)) // 如果没有错误，就返回结果
		} catch (err) {
			console.log(err)
			next(err) // 如果出现了错误，就传递给后续的中间件来处理
		}
	}
}