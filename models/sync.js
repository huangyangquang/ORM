// 同步所有模型

// 导入模型就是模型的定义了
require('./Admin')
require('./Class')
require('./Student')
require('./Book')

const sequelize = require('./db')
sequelize.sync({alter: true}).then(() => {
	console.log('所有模型同步完成！yap~')
})






