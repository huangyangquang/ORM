// 处理错误的中间件
const sendMsg = require('./getSendResult.js')

module.exports = (err, req, res, next) => {
	console.log('baseUrl：' + req.baseUrl) 
	if(err) {
		const errObj = err instanceof Error ? err.message : err
		
		res.status(500).send(sendMsg.getErr(errObj))
	} else {
		next()
	}
}

