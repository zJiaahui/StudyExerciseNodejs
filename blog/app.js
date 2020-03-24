const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
//创建web服务程序
const app = express();
//链接数据库
require("./model/connect");
//require("./model/user")
//告诉express框架模板位置在哪里（第一个参数是固定写法框架规定的）
app.set("views", path.join(__dirname, "views"));
//告诉模板的默认后缀
app.set("view engine", "art");
//配置模板引擎(因为express框架允许同时使用多个模板引擎)
app.engine("art", require("express-art-template"));
//设置处理post请求参数方式（extended:false表示用系统模块querystring处理extended:true表示采用第三方模块处理）
app.use(bodyParser.urlencoded({ extended: false }));

//静态资源路由(原理就是接收所有请求将请求url直接在指定的根目录下进行匹配)
app.use(express.static(path.join(__dirname, "public")));
// app.use("/a", express.static(path.join(__dirname, "public")));
//导入项目资源二级路由模块成员
const home = require("./router/home");
const admin = require("./router/admin");
//创建项目一级路由(并指向二级路由)
app.use("/home", home);
app.use("/admin", admin);
//设置服务程序端口
app.listen(80, () => {
  console.log("服务程序启动成功请访问");
});
