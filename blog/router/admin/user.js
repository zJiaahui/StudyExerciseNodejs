const { User } = require("../../model/user");
module.exports = async (req, res) => {
  req.app.locals.currentLink = "user";
  //数据分页功能
  const page = req.query.page || 1;
  //定义一页显示10条数据
  const pagesize = 10;
  //查询数据库中的所有数据条数
  const allsize = await User.countDocuments({});
  //计算所有数据要分多少页显示
  const allpage = Math.ceil(allsize / pagesize);
  //数据查询
  const users = await User.find()
    .limit(pagesize)
    .skip((page - 1) * pagesize);
  res.render("admin/user", {
    msg: req.session.username,
    alluser: users,
    page: page,
    allpage: allpage
  });
};
