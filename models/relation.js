// 设置模型关系

// 把正向关联和反向关联都弄上

const Class = require('./Class')
const Student = require('./Student')

Class.hasMany(Student)
Student.belongsTo(Class)
