module.exports = (req, res) => {
  console.log(req.query);

  const { msg } = req.query;
  res.render("admin/user-edit", { msg: msg });
};
