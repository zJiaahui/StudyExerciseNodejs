//评论数据集合
const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  aid: {
    //文章id
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  },
  uid: {
    //评论人用户id
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  time: {
    //评论时间
    type: Date
  },
  content: {
    //评论内容
    type: String
  }
});
const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
