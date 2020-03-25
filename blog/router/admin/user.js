const { User } = require("../../model/user");
module.exports = async (req, res) => {
  const users = await User.find();
  console.log(users);

  res.render("admin/user", { msg: req.session.username, alluser: users });
};
