//前端文章详情页面路由
const { Article } = require("../../model/article");
const { Comment } = require("../../model/comment");
module.exports = async (req, res) => {
  const id = req.query.id;
  const article = await Article.findOne({ _id: id }).populate("author");
  const comment = await Comment.find({ aid: id }).populate("uid");
  //console.log(comment);
  res.render("home/article.art", { article: article,comment:comment });
};
