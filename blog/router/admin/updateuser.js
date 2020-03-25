const { User, verifyUserInfo } = require("../../model/user");
const bcrypt = require("bcrypt");
module.exports = async (req, res, next) => {
  const id = req.query.id;
  try {
    await verifyUserInfo(req.body);
  } catch (error) {
    return next(
      JSON.stringify({
        path: "/admin/user-edit?msg=",
        msg: error.message,
        id: id
      })
    );
  }
  const { username, email, role, state, password } = req.body;
  const user = await User.findOne({ _id: id });
  const isTrue = await bcrypt.compare(password, user.password);
  if (isTrue) {
    await User.updateOne({ _id: id }, { username, email, role, state });
    res.redirect("/admin/user");
  } else {
    return next(
      JSON.stringify({
        path: "/admin/user-edit?msg=",
        msg: "密码输入错误不能修改用户信息",
        id: id
      })
    );
  }
};
