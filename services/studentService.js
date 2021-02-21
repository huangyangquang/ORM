const Student = require('../models/Student')
const { Op } = require("sequelize")
const Class = require('../models/Class')

exports.addStudent = async function (stuObj) {
	const ins = await Studnet.create(stuObj)
	return ins.toJSON()
}

exports.deleteStudent = async function (id) {
	return await Student.destory({
		where: {
			id
		}
	})
}

exports.updateStudent = async function (id, obj) {
	return await Student.update(obj, {
		where: {
			id
		}
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
		attributes: ['id', 'name'],
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

