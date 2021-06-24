const sequelize = require('./db.js');
const { DataTypes } = require('sequelize'); // 属性类型
const moment = require('moment')

const Student = sequelize.define("Student", {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	birthday: {
		type: DataTypes.DATE,
		allowNull: false,
		// 访问器：
		// 在不影响数据库保存的内容的情况下，我们获取到的数据格式是我们所有期望的。
		get() {
			// this.getDataValue 用于获取对应属性的值
			// return this.getDataValue('birthday').getTime();
			if (this.getDataValue('birthday') instanceof Date) {
	            return new Date(this.getDataValue('birthday')).getTime();
	        }
		}
	},
	// 虚拟属性
	age: {
		type: DataTypes.VIRTUAL,
		get() {
			const now = moment.utc()
			const birth = moment.utc(this.birthday)
			return now.diff(birth, 'y')
		}
	},
	sex: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	},
	mobile: {
		type: DataTypes.STRING(11),
		allowNull: false
	}
}, {
	paranoid: true
})

module.exports = Student