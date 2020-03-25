const { User } = require("../../model/user");
module.exports = async (req, res) => {
  const { msg, id } = req.query;
  if (id) {
    const user = await User.findOne({ _id: id });
    res.render("admin/user-edit", {
      msg: msg,
      _id: id,
      user: user,
      link: "/admin/updateuser?id=" + id
    });
  } else {
    res.render("admin/user-edit", {
      msg: msg,
      _id: id,
      link: "/admin/adduser"
    });
  }
};
