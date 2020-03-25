const { User } = require("../../model/user");
module.exports = async (req, res) => {
  //返回的是删除的用户
  const user = await User.findOneAndDelete({ _id: req.body.id });
  res.redirect("/admin/user");
};
