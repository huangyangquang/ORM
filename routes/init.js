const express = require('express')
const app = express()
const port = 5003

app.use(require('./staticMiddleware.js'))

app.get(
	'/news/mm', 
	(req, res, next) => {
		console.log(111)
		throw new Error('lllll')
		next() 
	}
)

app.get('/news', (req, res, next) => {
	console.log(333)
	res.send('25656666')
	next()
})

// 中间件正常使用方式：
app.use('/news', require('./errMiddleware.js'))

app.listen(port, () => {
	console.log('服务器监听端口：' + port)
})


