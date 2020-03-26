//前端文章列表页面路由（首页）
const { Article } = require("../../model/article");
const mongoosepage = require("mongoose-sex-page");
module.exports = async (req, res) => {
  const page = req.query.page;
  const articles = await mongoosepage(Article)
    .find()
    .page(page)
    .size(8)
    .display(5)
    .populate("author")
    .exec();
  res.render("home/default", { articles: articles });
};
