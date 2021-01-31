const sequelize = require('./db.js');
const { DataTypes } = require('sequelize'); // 属性类型

const Book = sequelize.define("Book", {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	imgUrl: {
		type: DataTypes.STRING, // 存的是图片的路径（可以存二进制数的图片信息，但是一般不会这么做）
	},
	publishDate: {
		type: DataTypes.STRING,
		allowNull: false
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	paranoid: true
})

module.exports = Book