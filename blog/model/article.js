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
    type: String,
    minlength: 3,
    required: [true, "内容最少3个字"]
  }
});
//根据文章集合规则创建文章集合
const Article = mongoose.model("Article", articleSchmae);

//验证用户表单
const Joi = require("joi");
function verifyArticleInfo(article) {
  const schema = {
    title: Joi.string()
      .min(4)
      .max(20)
      .required()
      .error(new Error("文章标题4-20字")),
    content: Joi.string()
      .min(3)
      .required()
      .error(new Error("内容最少三个字"))
  };
  return Joi.validate(article, schema);
}
//将文章集合作为模块成员导出
module.exports = { Article, verifyArticleInfo };
