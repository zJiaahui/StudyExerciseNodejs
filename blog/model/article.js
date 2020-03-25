//创建文章集合
const mongoose = require("mongoose");
//设置文章集合规则
const articleSchmae = mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    minlength: 4,
    required: [true, "请填写文章标题"]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "请传递作者"]
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  cover: {
    //封面
    type: String,
    default: null
  },
  content: {
    type: String
  }
});
//根据文章集合规则创建文章集合
const Article = mongoose.model("Article", articleSchmae);

//将文章集合作为模块成员导出
module.exports = { Article };
