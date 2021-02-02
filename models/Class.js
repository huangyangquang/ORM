const sequelize = require('./db.js');
const { DataTypes } = require('sequelize'); // 属性类型
// const Student = require('./Student')

const Class = sequelize.define("Class", {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	openDate: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	paranoid: true
})

// Class.hasMany(Student) // 一个班级有多个学生（这样就会在学生表里面建立一个外键关系）

module.exports = Class

