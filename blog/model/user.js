//创建用户集合
//导入mongoose数据库管理模块
const mongoose = require("mongoose");
//导入加密模块对象
const bcrypt = require("bcrypt");

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
async function createUser() {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash("123456", salt);
  const user = User.create({
    username: "guanliyuan",
    email: "123@qq.com",
    password: pass,
    role: "admin",
    state: 0
  });
}
//createUser();
//验证用户表单
const Joi = require("joi");
function verifyUserInfo(user) {
  const schema = {
    username: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error("用户名不合法")),
    email: Joi.string()
      .email()
      .required()
      .error(new Error("邮箱格式错误")),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(new Error("密码不合法")),
    role: Joi.string()
      .valid("admin", "normal")
      .required()
      .error(new Error("角色不合法")),
    state: Joi.string()
      .valid("0", "1")
      .required()
      .error(new Error("状态不合法"))
  };
  return Joi.validate(user, schema);
}

//将User和verifyUserInfo作为模块成员导出
module.exports = { User, verifyUserInfo };
