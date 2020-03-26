//删除文章路由
const { Article } = require("../../model/article");

module.exports = async (req, res) => {
  const article = await Article.findOneAndDelete({ _id: req.body.id });
  res.redirect("/admin/article");
};
