const Joi = require("joi");
//新增加用户功能路由
const { User } = require("../../model/user");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
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
  try {
    await Joi.validate(req.body, schema);
  } catch (error) {
    res.redirect("/admin/user-edit?msg=" + error.message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.redirect("/admin/user-edit?msg=" + "邮箱地址已被占用");
  } else {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await User.create(req.body);
    res.redirect("/admin/user");
  }
};
