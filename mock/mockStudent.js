const Mock = require('mockjs')
const Student = require('../models/Student')

const data = Mock.mock({
	"datas|500-800": [{
		name: "@cname",
		birthday: "@date",
		"sex|1-2": true, // 后边的value是用来确定类型的 
		mobile: /1\d{10}/,
		"ClassId|1-16": 2 
		// location: "@city(true)" // 模拟地址
	}]
})

console.log(data)

Student.bulkCreate(data.datas)

