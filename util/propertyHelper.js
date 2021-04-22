// 与对象属性处理相关的功能性函数

exports.pick = function(obj, ...props) {
	if(!obj || typeof obj !== 'object') {
		return obj;
	}

	const newObj = {}
	for(const key in obj) {
		if(props.includes(key)) {
			newObj[key] = obj[key]
		}
	}

	return newObj;
}




















