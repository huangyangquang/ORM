const sequelize = require('./db.js');
const { DataTypes } = require('sequelize'); // 属性类型

// 定义一个模型
// 参数：
// 1. 模型的名字（规范： 首字母大写）
// 2. 模型的配置（模型上有哪些属性，以及属性对应的配置，相当于配置表的列）
// 注意： 主键列我们一般不会配置，会自动生成id
const Admin = sequelize.define('Admin', {
  // 在这里定义模型属性
  loginId: {
    type: DataTypes.STRING, // 属性类型（列类型）
    allowNull: false // 是否允许为null, allowNull 默认为 true
  },
  loginPwd: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
  	type: DataTypes.STRING,
    allowNull: false
  }
}, {
	paranoid: true // 表示从此以后，该表的数据不会真正被删除 ，而是增加一列deleteAt,记录删除的时间
});
// `sequelize.define` 会返回模型, 后续对应某个模型的操作，都是通过这个模型对象来管理的。

module.exports = Admin;