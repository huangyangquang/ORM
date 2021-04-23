const log4js = require('log4js')
const path = require('path')

// 配置
// 下边配置就是说：
// 咋萌有一个分类，这个分类名称叫做sql, 这个分类的级别是 all, 这个分类的日志会被输出到一个文件里，这个文件的路径是./logs/sql
log4js.configure({
	appenders: { // 日志出口 (https://log4js-node.github.io/log4js-node/appenders.html)
		sql: { // 定义一个sql日志出口，所有的出口默认是写入控制台的
			type: 'dateFile', // 带日期命名日志文件
			filename: path.resolve(__dirname, 'logs', 'sql', 'logging.log'), // 写入日志的物理位置，使用绝对路径是比较好的；因为相对路径于控制台的路有关
			layout: { // https://log4js-node.github.io/log4js-node/layouts.html
				type: 'pattern', // 表示自定义的格式
				pattern: '[joshua]: %d{yyyy-MM-dd hh:mm:ss} %p %c : %m%n' // 就是写些占位符和些字符串进行拼接
			},
			maxLogSize: 1024, // 一般设置是100 - 200个kb一个文件, 这里配置文件的最大字节数 1024个字节 === 1kb; 如果超过了这个大小，就会把之前的日志消息备份出去，然后被文件清空，继续往里面写。
			keepFileExt: true, // 保留文件后缀
			daysToKeep: 1,// 保留几天内的数据， 0表示不做限制
		},
		default: { // 默认出口
			type: 'stdout', // 控制台输出
		}
	},
	categories: { // 日志分类
		sql: { // 某个分类的具体设置
			appenders: ['sql'], // 该分类使用日志出口sql的配置写入日志
			level: 'all' // 这个类型的日志的日志级别
		},
		default: { // 默认分类
			appenders: ['default'], // 该分类使用日志出口sql的配置写入日志
			level: 'all'
		}
	}
})

// 还有一个问题就是，我们不知道程序是会在什么时候崩溃的，如果程序崩溃了，但是日志还没有记录完成。
// 就会出现问题，所以，log4js建议我们在出现关闭之前，一定要调用一次 log4js.shutdown()。 就是让
// 还没有处理完的日志处理完。
process.on('exit', () => {
	log4js.shutdown()
})

const sqlLogger = log4js.getLogger('sql');
const defaultLogger = log4js.getLogger('default');

exports.sqlLogger = sqlLogger;
exports.log = defaultLogger;