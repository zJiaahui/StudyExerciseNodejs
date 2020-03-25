//新增加用户功能路由
const { User, verifyUserInfo } = require("../../model/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
module.exports = async (req, res, next) => {
  try {
    await verifyUserInfo(req.body);
  } catch (error) {
    return next(
      JSON.stringify({ path: "/admin/user-edit?msg=", msg: error.message })
    );
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(
      JSON.stringify({ path: "/admin/user-edit?msg=", msg: "邮箱地址已被占用" })
    );
  } else {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await User.create(req.body);
    res.redirect("/admin/user");
  }
};
