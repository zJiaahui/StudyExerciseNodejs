//blog博客管理页面二级路由router

const express = require("express");
const { User } = require("../model/user");
const bcrypt = require("bcrypt");
//创建admin路由对象
const admin = express.Router();

//创建admin路由登录页面
admin.get("/login", (req, res) => {
  res.render("admin/login");
  // res.send();
});
//创建admin用户页面
admin.get("/user", (req, res) => {
  res.render("admin/user");
});

//创建登录验证路由
admin.post("/login", async (req, res) => {
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
      console.log("加密密码比对成功" + user.password);

      res.render("admin/user");
    } else {
      res.status(400).render("admin/error", { msg: "用户名或密码错误" });
    }
  }
  res.send();
});
//将admin路由router作为模块成员进行导出
module.exports = admin;
