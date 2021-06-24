const express = require('express')
const stuServ = require('../../services/studentService.js')
const {asyncHandler} = require('../getSendResult.js')

// 创建一个路由 （本质是一个中间件）
const stuRouter = express.Router();

// 路由里边分情况进行处理：
// get方法 请求 /api/stu/
stuRouter.get(
	'/', 
	asyncHandler(async (req, res, next) => { // asyncHandler已经找了响应消息的处理
		const query = req.query
		const page = query.page || 1
		const limit = query.limit || 10
		const sex = query.sex || -1
		const name = query.name || ""

		// throw new Error('iookoko')

		return await stuServ.getStudents(page, limit, sex, name)
	})
)

// get方法 请求 /api/stu/:id
// stuRouter.get(
// 	'/:id', 
// 	asyncHandler(async (req, res, next) => {
// 		console.log(req.params)
// 		return await stuServ.getStudentById(req.params.id)
// 	})
// )

stuRouter.post(
	'/', 
	asyncHandler(async (req, res) => {
		return await stuServ.addStudent(req.body)
	})
)

stuRouter.put(
	'/:id', 
	asyncHandler(async (req, res, next) => {
		return await stuServ.updateStudent(req.params.id, req.body)
	})
)

stuRouter.delete(
	'/:id', 
	asyncHandler(async (req, res, next) => {
		return await stuServ.deleteStudent(req.params.id)
	})
)


module.exports = stuRouter
