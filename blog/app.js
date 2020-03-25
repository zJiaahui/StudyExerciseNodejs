const express = require("express");
const path = require("path");
//导入处理post请求参数模块
const bodyParser = require("body-parser");
//导入session模块（用于记住用户登入状态）
const session = require("express-session");

//创建web服务程序
const app = express();
//导入日期格式处理模块
const dateformat = require("dateformat");
//全局配置dateformat
//导入模板在向模板中导入dateformat
const template = require("art-template");
template.defaults.imports.dateformat = dateformat;
//链接数据库
require("./model/connect");

//告诉express框架模板位置在哪里（第一个参数是固定写法框架规定的）
app.set("views", path.join(__dirname, "views"));

//告诉模板的默认后缀
app.set("view engine", "art");

//配置模板引擎(因为express框架允许同时使用多个模板引擎)
app.engine("art", require("express-art-template"));

//设置处理post请求参数方式（extended:false表示用系统模块querystring处理extended:true表示采用第三方模块处理）
app.use(bodyParser.urlencoded({ extended: false }));

//配置session
app.use(
  session({ resave: true, saveUninitialized: true, secret: "secret key" })
);

//静态资源路由(原理就是接收所有请求将请求url直接在指定的根目录下进行匹配)
app.use(express.static(path.join(__dirname, "public")));
// app.use("/a", express.static(path.join(__dirname, "public")));

//拦截请求，app.use()是按顺序执行的在所有路由前使用该中间件拦截所以请求
app.use("/admin", require("./middleware/loginGuard"));

//创建项目一级路由(并指向二级路由)
app.use("/home", require("./router/home"));
app.use("/admin", require("./router/admin"));

//创建错误处理中间件（必须放在所有路由的最后面）
app.use((err, req, res, next) => {
  if (JSON.parse(err).id) {
    res.redirect(
      JSON.parse(err).path +
        JSON.parse(err).msg +
        "&" +
        "id=" +
        JSON.parse(err).id
    );
  } else {
    res.redirect(JSON.parse(err).path + JSON.parse(err).msg);
  }
});
//设置服务程序端口
app.listen(80, () => {
  console.log("服务程序启动成功请访问");
});
