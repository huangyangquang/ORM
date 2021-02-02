// 模拟班级数据

const Mock = require('mockjs')
const Class = require('../models/Class')

 // 参数：
 // 是要模拟出来的数据的格式规则，里面是key-value的形式，表示模拟出来的key-value的生成规则
const data = Mock.mock({
    "datas|16": [{
    	"id|+1": 1,
    	"name": "前端第 @id 期", // @~ 表示占位符，这个地方就是读取id的值
    	"openDate": "@date"
    }] // 表示生成一个有3-10项的数组
}) // 返回模拟结果是个obj

// 输出结果
console.log(JSON.stringify(data))


// 把模拟的数据导入数据库:
// 导入多个数据，使用如下,这样就可以往数据插入多条数据（之前是一次一条）
Class.bulkCreate(data.datas)
