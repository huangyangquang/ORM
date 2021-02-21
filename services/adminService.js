// 提供和 admin 相关的业务功能


// tip: 业务逻辑就不使用代码写了，看如下注释
const Admin = require('../models/Admin')

// 管理员初始化：
// 判断数据库中是否有管理员，如果没有，自动添加一个默认管理员 


// 增：
// 有什么业务逻辑呢？
// 增加一个管理员，我们是不是就要保证管理员的账号不能和表里已经有的账号重复？
// 这个就是业务逻辑
exports.addAdmin = async function (adminObj, operatorId) {
	// 业务逻辑： 应该判断adminObj的各种属性是否合理，以及账号是否已存在，已经谁有权限来添加管理员等...
	// 注意：我们对数据至少要有一层判断，而且这一层判断必须是在服务器上，而不是在前端上

	const ins = await Admin.create(adminObj) // 获取到模型实例，上面是有很多属性和方法的
	// 但是，对于ins这个模型实例上方法，比如save方法等其他乱七八糟的东西
	// 所以，如果我们要得到一个纯粹的对象的话，我们可以直接调用它的toJSNON方法
	// 这样就可以把ins模型实例变成一个json格式的对象，就是一个非常平面的对像，不是实例了
	return ins.toJSON()
}

// 删：
// 有什么业务逻辑呢？
// 能不能把管理员都删完了呢？不可以吧，至少得有一个管理员存在吧。
exports.deleteAdmin = async function (adminId) {
	// // 方式一： 通过id获取到实例，通过实例上方法来删除实例
	
	// // 通过主键去查找一个模型实例
	// const ins = await Admin.findByPk(adminId)
	// if(ins) {
	// 	// 删除模型实例 (实际上，我们这个表是偏置表 删除是运行update语句，会发现对于的某一行的deleteAt是有值的)
	// 	await ins.destroy()
	// }
	
	// 方式二： 
	// 不是通过实例来调用destory,而是通过模型来调用destory的.
	// 这个时候就得给它传递参数作为删除条件。
	const result = Admin.destroy({
		// 我们是要删除什么数据，这叫做查询条件，后边讲查询时还会详细讲这个where，
		// 后边查询条件的where在这里都可以使用
		where: {
			id: adminId // id 就是 模型里面的属性id
		}
	})
	return result
}

// 改：
// 有什么业务逻辑呢？
// 修改管理员，但是不能修改账号，可以修改密码。
exports.updateAdmin = async function (id, adminObj) {
	// // 方式一：
	// // 1. 获取实例
	// const ins = await Admin.findByPk(id)
	// // 2. 修改实例属性：
	// ins.loginId = adminObj.loginId
	// // 3. 保存
	// ins.save()

	// 方式二： 通过模型直接修改
	// 两个参数： 修改的数据，修改的条件
	const result = await Admin.update(adminObj, {
		where: {
			id
		}
	})
	return result // 返回的是一个数组，里面表示的是受影响的行数，为甚是个数组呢？因为它不知道我们的SQL语句写了多少条，一次运行可以有多条SQL语句，所以可能会有多条受影响的行数
}

exports.login = async function (loginId, loginPwd) {
	const result = await Admin.findOne({ // 里面是查询的配置 或者 说是查询条件
		where: { // 里面条件的关系是并且关系
			loginId,
			loginPwd
		}
	}) // 本质就是使用了 limit 0, 1
	
	if (result && result.loginId === loginId && result.loginPwd === loginPwd) {
		return result.toJSON()
	}

	// 结果是一个模型实例,所以可以使用之前学习的，改变模型实例的属性，然后save()...; 
	// 不过一般很少使用这个实例，我一般会把他转换为一个普通的平面对象
	return null; 
}


exports.getAdminById = async function (id) {
	const result = await Admin.findByPk(id)
	if(result) {
		return result.toJSON()
	}
	return null;
}


// 上面讲得业务逻辑有点像是验证，确实呢个，验证时业务逻辑得一部分