// require('./models/sync')

const adminServ = require('./services/adminService')

// adminServ.addAdmin({
// 	loginId: 'uiuiuiui',
// 	loginPwd: '909090909',
// 	name: 'nike'
// })


// adminServ.deleteAdmin(8).then(res => {
// 	console.log(res)
// }) // 删除过id 为 5 ， 6， 8的模型实例

adminServ.updateAdmin(10, {
	loginId: '修改的对象'
}).then(res => {
	console.log(res)
})











// for example: 增加管理员 

// 方式一：
// 1. 使用模型提供的build函数，来构建一个模型实例，是一个同步方法，
// 2. 那么，构建这个模型实例的数据是什么呢？
// 	答：就是我们模型中对应的属性
// 3. 然后会返回一个模型的实例
// 4. 然后，当我们调用模型实例的save方法时，才会去运行SQL语句，把这个模型存储到数据库里面。
// 5. 在调用save方法之前，还可以对模型实例上的数据进行修改。
// 6. save方法是一个异步的方法（promise）
// 	当它保存到数据库，数据库保存数据一定是比内存保存变量的要慢很多的，所以这save方法一定是一个异步的。
// 	等数据库执行完之后，promise结束，所以在这里可以使用async + await / then 来等待其结束，然后做其他的事情。

// 导入模型：
// const Admin = require('./models/Admin')
// 方式一：
// const adminIns = Admin.build({
// 	loginId: 'abc',
// 	loginPwd: '123',
// 	name: 'joshua'
// });

// adminIns.loginId = 'kkk'

// adminIns.save().then(() => {
// 	console.log('新建管理员成功，yep~~')
// })

// 方式二：
// 使用模型的create函数来进行新增，它与build函数的区别就是：
// create函数相当于先运行了模型的build函数，然后再自动运行模型实例的save函数
// create函数也是异步的（promise），它完成之后，我们可以获取到一个模型实例ins
// 这个模型实例ins保存的就是新建的结果。

// 导入模型：
// const Admin = require('./models/Admin')
// Admin.create({
// 	loginId: 'admin',
// 	loginPwd: '00000000000',
// 	name: 'bigStrong'
// }).then(ins => {
// 	console.log('实例创建成功', ins.id, ins.name)
// 	console.log(ins.dataValues)
// })
