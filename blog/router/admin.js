//blog博客管理页面二级路由router

const express = require("express");

//创建admin路由对象
const admin = express.Router();

//创建admin路由
admin.get("/login", (req, res) => {
  res.render("admin/login");
  // res.send();
});
admin.get("/user", (req, res) => {
  res.render("admin/user");
});

//将admin路由router作为模块成员进行导出
module.exports = admin;
