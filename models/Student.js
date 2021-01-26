const sequelize = require('./db.js');
const { DataTypes } = require('sequelize'); // 属性类型

const Student = sequelize.define("Student", {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	birthday: {
		type: DataTypes.STRING,
		allowNull: false
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
	paranoid: true,
	logging: false
})

module.exports = Student