const express = require('express')
const app = express()
const port = 5003
const path = require('path')

// 静态资源目录
const staticRoot = path.resolve(__dirname, '../public')

// express.static() 是一个高阶函数：
// 它返回值就是一个函数，这被返回的函数就是一个中间件
// 参数： 静态资源的目录在哪里
// 
// 把静态资源目录传递给express.static()，它就会自动帮我们完成静态资源的映射。
// 而且消息头什么的都帮我们设置好了
// app.use(express.static(staticRoot))


// 请求时，必须以static开头，它才会从目录staticRoot 里边去找文件资源
app.use('/static', express.static(staticRoot, {
	index: 'index.html'
}))
// app.use('/static', (req, res) => {
// 	console.log(req.baseUrl, req.path)
// })


app.use(express.urlencoded({
	extended: true // 使用qs库进行消息体body的解析
}))
// 自行封装：
// app.use(require('./myUrlEncoded.js'))
 

// 解析json格式的消息体
app.use(express.json())


app.get('/css/index.css', (req, res) => {
	console.log('66666')
})

app.post('/api/stu', (req, res) => {
	console.log('消息体呢：', req.body)
})


// 中间件正常使用方式：
app.use(require('./errMiddleware.js'))

app.listen(port, () => {
	console.log('服务器监听端口：' + port)
})


