const Student = require('../models/Student')
const { Op } = require("sequelize")
const Class = require('../models/Class')

// 导入
const validate = require('validate.js')
const moment = require('moment')
const {pick} = require('../util/propertyHelper')


exports.addStudent = async function (stuObj) {
	stuObj = pick(stuObj, 'name', 'birthday', 'sex', 'mobile', 'ClassId')

	// 扩展validate，增加自定义规则
	// 如果函数是同步操作的话，就直接 return / return 'XXX' 就可以
	// 但是，我这里是查询数据库的操作，肯定是异步
	validate.validators.classExits = async function(value) {
		// value 是 我们在进行属性验证时，如果有调用到classExits时，传递进来的值
		const classObj = await Class.findByPk(value)
		if(classObj) {
			return
		}
		return 'is not exit' // 返回错误消息，前面会自动加上属性名 ClassId 的
	}



	// 验证的规则
	// 针对对象上的每一个属性，定制不同的规则
	// 因为这些验证后的信息是给开发者看的,不是个用户看的,所以英文就无所谓了
	// 自带的验证规则： http://validatejs.org/#validators
	const rule = {
		// name属性的规则
		name: {
			// presence： true, // 验证是否必填 => http://validatejs.org/#validators-presence
			presence: {
				message: "is required, come on", // 修改提示信息 ，提示信息是给开发者看的，英文和中文都无所谓的
				allowEmpty: false // 不允许为空
			},
			type: 'string', // 类型 http://validatejs.org/#validators-type
			length: {
				minimum: 2,
				maximum: 8
			}, // 长度 => http://validatejs.org/#validators-length
		},
		birthday: {
			presence: {
				allowEmpty: false // 不允许为空
			},
			// 类型使用'date'是不好的，因为这样的话，它的类型就必须是一个日期对象，但是我们日期的写法是很灵活的，可以是时间戳，字符串等，它不一定是要是个date对象。
			// 所以，我们对日期类型的判断，往往是使用 datetime 的方式，而不是使用 type 进行判断。
			// datetime文档： http://validatejs.org/#validators-datetime
			datetime: {
				dateOnly: true, // 表示只需要日期，不需要时间部分
				// 服务器都使用utc:
				// 100年前时间戳，表示在当前的时间上减少100年（不能早于100年前）
				earliest: +moment.utc().subtract(100, 'y'), // 表示日期最早不能早于多少, 给任何格式都可以，因为最后都会通过parse函数进行转换，转换为时间戳
				// 5年前时间戳，表示在当前的时间上减少5年（不能晚于5年前）
				latest: +moment.utc().subtract(5, 'y'), // 表示日期最晚不能晚于多少, 给任何格式都可以，因为最后都会通过parse函数进行转换，转换为时间戳
			}
		},
		sex: {
			presence: true,
			type: 'boolean'
		},
		mobile: {
			presence: {
				allowEmpty: false
			},
			// 通过正则表达式进行验证
			format: /1\d{10}/
		},
		ClassId: {
			presence: true,
			// 必须是数字，数字验证有几种验证方式
			// 1. type: integer(整数) 、number(任何数字)； 但是，这个验证太严格，必须要是真正的数字, 不支持字符串数字
			// 2. numericality： {}；这种的验证比较宽松些，只要是一个数字就有，内部会进行数字类型转换
			numericality: {
				onlyInteger: true,
				strict: false,
			},
			// 传入的 ClassId，我们需要判断班级是否存在，这要怎么判断呢？
			// 1. 这部分在这里是没办法验证的，属于业务逻辑的判断，可以先在这些验证通过了之后，在判断ClassId是不是存在。
			// 2. 直接集成到验证规则里面，就需要自定义验证了，需要对验证器进行扩展，增加我们自定义的规则:validate.validators.classExits
			// 		然后在验证的属性里设置：classExits: true
			classExits: true
		}
	}


	// 参数：
	// 第一个： 要被验证的对象
	// 第二个： 验证的规则
	// 返回结果，如果验证通过，就返回undefined; 
	// 如果验证不通过，返回的是错误的信息对象，错误信息对象上的属性是对应属性的不符合规则信息
	// const result = validate.validate(stuObj, rule)  // 这是同步的验证方式
	// console.log(result)
	
	// 写法修改：（兼容异步情况）
	// 这是异步的验证方式，因为我们的classExits是异步验证的，使用同步是会阻塞后续代码的
	// 所以这里改为异步的验证
	// 如果验证通过，它啥也不会做；
	// 如果验证失败，就会报错
	// try {	
	// 	await validate.async(stuObj, rule) 
	// }
	// catch (err) {
	// 	console.log(err)
	// } // 但是，在服务端不会去捕获它，会让它报错，然后让路由层去处理
	// 所以，直接如下写法：
	await validate.async(stuObj, rule) 

	// 验证成功就添加学生，验证失败就报错了
	const ins = await Student.create(stuObj)
	return ins.toJSON()
}


exports.deleteStudent = async function (id) {
	return await Student.destroy({
		where: {
			id
		}
	})
}

exports.updateStudent = async function (id, obj) {
	return await Student.update(obj, {
		where: {
			id
		},
	})
}

// exports.getStudents = async function (page = 1, limit = 10) {
// 	const result = await Student.findAll({
// 		offset: (page - 1) * limit, // 跳过多少数据
// 		limit: +limit // 取多少数据
// 	})
// 	console.log(result)
// 	// 获取学生总数
// 	const total = await Student.count()
// 	const datas = JSON.parse(JSON.stringify(result)) // 先stringify是为了获取到一个平面对象
// 	return {
// 		total,
// 		datas
// 	}
// }


exports.getStudents = async function (page = 1, limit = 10, sex = -1, name='') { // sex === -1 表示不按性别进行查询
	const where = {}
	if(sex !== -1) {
		where.sex = !!sex // 强制转化为布尔类型
	}
	if(name) {
		where.name = {
			[Op.like]: `%${name}%`
		}
	}
	const result = await Student.findAndCountAll({
		attributes: ['id', 'name', 'sex', 'birthday', 'age'],
		where: where,
		offset: (page - 1) * limit,
		limit: +limit,
		include: [Class] // 目前只是关联了Class表
	})
	return {
		total: result.count, // 总数是被条件限制的总数，不是所有学生的总数
		datas: JSON.parse(JSON.stringify(result.rows))
	}
}

