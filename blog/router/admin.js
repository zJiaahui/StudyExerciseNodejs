//blog博客管理页面二级路由router

const express = require("express");

//创建admin路由对象
const admin = express.Router();

//创建admin登录页面路由
admin.get("/login", require("./admin/loginpage"));

//创建admin用户页面路由
admin.get("/user", require("./admin/user"));

//创建登录验证路由
admin.post("/login", require("./admin/login"));

//退出登录路由
admin.get("/logout", require("./admin/logout"));

//新增用户页面路由
admin.get("/user-edit", require("./admin/user-deit"));
//新增加用户功能路由
admin.post("/adduser", require("./admin/adduser"));

//修改用户功能路由
admin.post("/updateuser", require("./admin/updateuser"));

//删除用户功能路由
admin.post("/deluser", require("./admin/deluser"));

//文章列表页面路由
admin.get("/article", require("./admin/article"));

//文章编辑页面路由
admin.get("/article-edit", require("./admin/article-edit"));

//添加文章表单路由
admin.post("/article-add", require("./admin/article-add"));

//删除文章功能路由
admin.post("/article-del", require("./admin/delarticle"));

//修改文章路由
admin.post("/article-update", require("./admin/article-update"));

//将admin路由router作为模块成员进行导出
module.exports = admin;
