 // 通过这个构造函数可以创建一个数据库的连接。
 // 实际上，通过这个构造函数构造出来的实例在内部使用了一个连接池，它会帮我们管理这个连接池，我们不需要去管理连接。
const { Sequelize } = require('sequelize');

// 传递配置参数，并且创建实例
// 参数：
// 数据库名，用户名，密码，
// {
// 	host: 数据库所在的服务器
// 	dialect: 使用哪一种数据库  /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
// }
// 这个ORM实例在整个系统中有一个就够了。
const sequelize = new Sequelize('schooldb', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  logging: null // 关闭 bash 上显示的SQL语句
}); // 这样就创建好了“连接”（准确说是，sequelize实例），这个“连接”是来自于连接池的。 sequelize实例会自动帮我们管理连接池

// 导出
module.exports = sequelize;
