//编辑文章表单路由
const { Article } = require("../../model/article");
module.exports = async (req, res) => {
  req.app.locals.currentLink = "article";
  const acticleId = req.query.id;
  const msg = req.query.msg;
  const article = await Article.findOne({ _id: acticleId });
  // res.send(article);
  if (acticleId) {
    res.render("admin/article-edit.art", {
      article: article,
      link: "/admin/article-update?id=" + acticleId,
      msg: msg
    });
  } else {
    res.render("admin/article-edit.art", {
      link: "/admin/article-add",
      msg: msg
    });
  }
};
