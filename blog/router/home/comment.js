//文章评论路由
const dateformat = require("dateformat");
const { Article } = require("../../model/article");
const { Comment } = require("../../model/comment");
module.exports = async (req, res) => {
  const { aid, uid, content } = req.body;
  const time = new Date();
  console.log(dateformat(time, "yyyy-mm-dd hh:MM:ss"));
  const comment = await Comment.create({ aid, uid, time, content });
  res.redirect("/home/article?id=" + aid);
};
