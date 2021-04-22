require('./init')

const studentServ = require('./services/studentService')

studentServ.addStudent({
	name: [],
	birthday: '100-05-5', // 错误的日期格式
	sex: 111,
	mobile: 555,
	ClassId: '23.3'
}).catch(err => {
	console.log('第一个', err)
})

studentServ.addStudent({
	name: '',
	birthday: '1900-3-5',
	mobile: '1145515',
	ClassId: 'samkl'
}).catch(err => {
	console.log('第二个', err)
})

studentServ.addStudent({
	name: '322552555585',
	birthday: '2020-3-5',
	sex: '',
	ClassId: '222'
}).catch(err => {
	console.log('第三个', err)
})

studentServ.addStudent({
	name: '322552',
	birthday: '2000-3-5',
	sex: true,
	mobile: '13469614911',
	ClassId: 1,
	deletedAt: '2021-2-21', // 不希望出现
	id: 0, // 不希望出现
	a: 'joshua' // 不希望出现
}).catch(err => {
	console.log('第四个', err)
})






























// const moment = require('moment')
// moment.locale("zh-cn") // 设置语言库

// // 获取本地时间，是个moment对象，后续操作根据本地时间来操作
// console.log( moment() )
// // 获取utc时间，是个moment对象，后续操作根据utc时间来操作
// console.log( moment.utc() )

// // 同一个时刻：
// console.log( moment().toString() ) // 获取到本地时间
// console.log( moment.utc().toString() ) // 获取utc时间

// // 获取时间戳：
// console.log( moment().valueOf(), moment.utc().valueOf() ) // 获取到本地时间 和 utc时间 的 时间戳
// console.log( +moment(), +moment.utc() ) // 获取到本地时间 和 utc时间 的 时间戳


// // 服务器上统一使用utc


// // 根据指定时间格式来获取事时间戳：
// // 时间格式：
// 	// xxxx-xx-xx
// 	// xxxx/xx/xx
// 	// iso标准
// 	// 时间戳
// 	// ...

// // 时间格式：时间戳
// console.log( moment(0).toString(), +moment(0) )
// console.log( moment.utc(0).toString(), +moment.utc(0) )

// // 其他时间格式：
// const time = '1970-01-01 00:00:00'
// console.log( moment(time).toString(), +moment(time) ) // 所以，遇见类似的时间格式，就不能使用这个
// console.log( moment.utc(time).toString(), +moment.utc(time) ) // 所以，遇见类似的时间格式，得能使用这个


// // 使用日期令牌转换：
// // 令牌：是一个格式化得字符串  例如："YYYY-MM-DD HH:mm:ss", 就是我们得时间格式得按照这个格式来
// // 它被用于moment对象 和 最终的字符串之间的转换。
// // 一个moment对象上记录了一个时间，这个时间如何使用一个字符串来展示，我就使用一个令牌。
// // 一个字符串，也是需要通过(满足)某个令牌才可以转换为一个moment对象

// // 转换得到一个moment对象：
// // http://momentjs.cn/docs/#/parsing/string-format/
// // 第二个参数表示支持的时间格式（令牌）： 多个令牌的话，第二个参数可以是数组，一个令牌就使用字符串就可以
// // 第三个参数表示是否严格检查： true / false
// // true:  严格的解析要求格式和输入完全匹配（推荐）
// // false: 哪怕不满足我们设置的令牌，也会看其他的满不满足
// const format = ['YYYY-MM-DD HH:mm:ss', 'YYYY-H-D H:m:s', 'x']
// console.log( moment.utc('1970-01-01 00:00:00', format, true) )
// console.log( moment.utc('1970-1-2 0:0:0', format, true) )
// console.log( moment.utc('1998/2/25', format, true) )
// console.log( moment.utc(12555255555555, format, true) )

// // 上面是服务器常见的使用方法，就是客户端传递数据的时候，要对数据进行一些验证。
// // 判断日期格式是否正确，能不能进行转换
// // 一个不正常的日期就转为 Moment<Invalid date>

// // Moment<Invalid date>还有另外一个特点： 把它转换为时间戳的话，就是NaN
// console.log( +moment.utc('1998/2/25', format, true) )

// // 判断是否是一个有效日期：
// console.log( moment.utc('1998/2/25', format, true).isValid() )
// console.log( moment.utc(12555255555555, format, true).isValid() )


// // 获取到moment对象之后，我们应该怎么来操作它呢？
// const m = moment.utc('2015-1-5 23:00:01', format, true)

// // 通过友好的方式显示出来（发生在客户端）： http://momentjs.cn/docs/#/displaying/
// // 也就是返回一个字符串
// // 1. .format()
// console.log( m.format("YY年MM月DD日 HH点mm分ss秒秒买哦") ) // 这里显示出来的是一个utc时间，因为是一个utcmoment对象

// // 判断是不是utc时间：
// console.log( m.isUTC() )

// // 如何将utc时间转换为本地时间： .loacl()
// console.log( m.local().format("YY年MM月DD日 HH点mm分ss秒秒买哦") ) // 这里显示出来的是一个本地时间


// // 比如：用户输入文本框，输入一个本地时间
// const mLocal = moment('2015-1-5 23:00:01', format, true) // 时间本地时间格式化
// // 如何将本地时间转换为utc时间： .utc()（然后转为时间戳 或者 utc时间传输到服务器）
// const local2Utc = mLocal.utc('2015-1-5 23:00:01', format, true)
// console.log( local2Utc.format("YY年MM月DD日 HH点mm分ss秒秒买哦") )
// // 如何将本地时间转换为时间：
// console.log( +mLocal )

// // 2. .fromNow()
// console.log( moment('2015-1-5 23:00:01', format, true).fromNow() ) // 6 years ago
// console.log( moment('2021-2-22 20:00:01', format, true).fromNow() ) // a month ago




// const adminServ = require('./services/adminService')

// adminServ.updateAdmin(1, {
// 	loginId: 'djakja',
// 	name: '叫哥的',
// 	loginPwd: '1234'
// })

// adminServ.login('djakja', '1234').then(res => {
// 	console.log(res)
// })

// adminServ.addAdmin({
// 	loginId: 'djakja',
// 	name: '叫金山',
// 	loginPwd: '1234'
// })




// const md5 = require('md5')

// console.log( md5('') )
// console.log( md5('y') )
// console.log( md5('joshua is 18 years old') )
// console.log( md5('joshua is 18 years old') )
// console.log( md5('joshua is 18 years oldpppppppppppppppppppppppppppppppppppppppp') )


// require('./models/sync')

// require('./models/relation')

// const studentServ = require('./services/studentService')

// studentServ.getStudents(1, 10, false, "杰").then(res => {
// 	console.log(res.datas[0].Class)
// })


// const adminServ = require('./services/adminService')

// adminServ.login('KKK', '123').then(res => {
// 	console.log(res) // 结果是一个模型实例
// })

// adminServ.getAdminById(9).then(res => {
// 	console.log(res)
// })



// const adminServ = require('./services/adminService')

// adminServ.addAdmin({
// 	loginId: 'uiuiuiui',
// 	loginPwd: '909090909',
// 	name: 'nike'
// })


// adminServ.deleteAdmin(8).then(res => {
// 	console.log(res)
// }) // 删除过id 为 5 ， 6， 8的模型实例

// adminServ.updateAdmin(10, {
// 	loginId: '修改的对象'
// }).then(res => {
// 	console.log(res)
// })



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
