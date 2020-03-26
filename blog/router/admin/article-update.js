const { Article, verifyArticleInfo } = require("../../model/article");
//导入模块formidable表单处理模块
const formidable = require("formidable");
const path = require("path");
module.exports = async (req, res, next) => {
  const article = await Article.findOne({ _id: req.query.id });
  if (article) {
    //创建表单解析对象
    const form = formidable.IncomingForm();
    //配置上传文件保存路径
    form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
    //保留上传文件后缀formidable默认不保留
    form.keepExtensions = true;
    //解析表单 第一个参数为要解析的表单数据对象req，第二个参数是一个回调函数
    form.parse(req, async (err, fileds, files) => {
      try {
        const { title, content } = fileds;
        await verifyArticleInfo({ title, content });
      } catch (error) {
        return next(
          JSON.stringify({
            path: "/admin/article-edit?id=" + req.query.id + "&msg=",
            msg: error.message
          })
        );
      }

      let coverpath = files.cover.path.split("public")[1];

      if (coverpath.indexOf(".") == "-1") {
        coverpath = article.cover;
      }
      await Article.updateOne(
        { _id: req.query.id },
        {
          title: fileds.title,
          publishDate: fileds.publishDate,
          cover: coverpath,
          content: fileds.content
        }
      );

      res.redirect("/admin/article");
    });
  }
};
