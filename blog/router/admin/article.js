const { Article } = require("../../model/article");
module.exports = async (req, res) => {
  req.app.locals.currentLink = "article";
  const articles = await Article.find().populate("author");
  console.log(articles);

  res.render("admin/article.art", { articles: articles });
};
