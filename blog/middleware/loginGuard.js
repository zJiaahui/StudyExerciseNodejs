//中间件函数
//登录拦截中间件
const guard = (req, res, next) => {
  //所有一级路由为/admin的请求会进入该中间件
  if (req.url != "/login" && !req.session.username) {
    //通过二级路由判断不是访问登录页面，再判断session没有记录登录状态
    //重定向至登录页面
    res.redirect("/admin/login");
  } else {
    //放行请求
    if (req.session.role == "normal") {
      res.redirect("/home");
    }
    next();
  }
};

module.exports = guard;
