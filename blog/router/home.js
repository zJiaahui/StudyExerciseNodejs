/*blog博客首页二级路由router
 */
const express = require("express");
//创建blog博客展示页面路由对象
const home = express.Router();
//创建home路由
home.get("/", require("./home/default"));
home.get("/default", require("./home/default"));
home.get("/article", require("./home/article"));
home.get("/logout", require("./home/logout"));
home.post("/comment", require("./home/comment"));
//将blog博客的home路由对象作为模块成员进行导出
module.exports = home;
