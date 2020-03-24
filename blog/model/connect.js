//建立数据库链接

//导入mongoose数据库管理模块
const mongoose = require("mongoose");
//向数据库建立链接
mongoose
  .connect("mongodb://127.0.0.1/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("数据库链接成功");
  })
  .catch(err => {
    console.log("数据库链接失败");
  });
