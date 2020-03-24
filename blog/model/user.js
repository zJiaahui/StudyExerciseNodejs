//创建用户集合
//导入mongoose数据库管理模块
const mongoose = require("mongoose");

//创建集合规则
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "用户名必填"],
    minlength: [2, "用户名长度不够"],
    maxlength: [20, "用户名长度太长"]
  },
  email: {
    type: String,
    //保证插入数据不重复
    unique: [true, "数据库里已经插入了该邮箱"],
    required: [true, "邮箱必须填写"]
  },
  password: {
    type: String,
    required: [true, "密码必须填写"]
  },
  role: {
    type: String,
    required: [true, "角色必选"],
    enum: {
      values: ["admin", "normal"], //超级管理用户admin  普通用户normal
      message: "角色设置错误"
    }
  },
  state: {
    //状态0启用 1禁用
    type: Number,
    default: 0 //默认为0
  }
});
// 创建集合
const User = mongoose.model("User", schema);

// //创建文档
// User.create({
//   username: "guanliyuan",
//   email: "123@qq.com",
//   password: "123456",
//   role: "admin",
//   state: 0
// })
//   .then(doc => {
//     console.log("用户创建成功");
//   })
//   .catch(err => {
//     console.log("用户创建失败");
//     for (var attr in err.errors) {
//       console.log(err.errors[attr][message]);
//     }
//   });

//将User作为模块成员导出
module.exports = { User };
