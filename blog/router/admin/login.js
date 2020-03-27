const { User } = require("../../model/user");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  //res.render("admin/login");
  const { email, password } = req.body;
  if (email.length == 0 || password.length == 0) {
    res.status(400).render("admin/error", { msg: "用户名或密码错误" });
    return false;
  }
  let user = await User.findOne({ email });
  if (!user) {
    res.status(400).render("admin/error", { msg: "用户名或密码错误" });
    return false;
  } else {
    let isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      req.session.role=user.role;
      if (user.role == "admin") {
        //通过req.session记录用户登录状态
        req.session.username = user.username;
        //req能获取express框架的app对象然后通过app.locals.将数据报了出去让所有模板都可以访问
        req.app.locals.userInfo = user;
        //重定向到用户列表页面
        res.redirect("/admin/user");
      } else {
        //通过req.session记录用户登录状态
        req.session.username1 = user.username;
        //req能获取express框架的app对象然后通过app.locals.将数据报了出去让所有模板都可以访问
        req.app.locals.userInfo1 = user;
        //重定向到用户列表页面
        res.redirect("/home?id=" + user._id);
      }
    } else {
      res.status(400).render("admin/error", { msg: "用户名或密码错误" });
    }
  }
  res.send();
};
