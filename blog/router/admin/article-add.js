//添加文章表单路由

//导入模块formidable表单处理模块
const formidable = require("formidable");
const path = require("path");
//导入文章集合
const { Article, verifyArticleInfo } = require("../../model/article");

module.exports = async (req, res, next) => {
  //创建表单解析对象
  const form = formidable.IncomingForm();
  //配置上传文件保存路径
  form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
  //保留上传文件后缀formidable默认不保留
  form.keepExtensions = true;
  //解析表单 第一个参数为要解析的表单数据对象req，第二个参数是一个回调函数
  form.parse(req, async (err, fileds, files) => {
    //err错误对象，解析失败err存在错误信息，如果成功err则是null
    //fileds 对象类型 保存普通表单数据
    //files 对象类型  保存上传文件相关数据 格式如下（其中的path路径就是上面指定的路径）
    /* {
        "cover": {
            "size": 245910,
            "path": "E:\\GitMyClone\\StudyExerciseNodejs\\blog\\public\\uploads\\upload_efb33016f9e852f61ad35238c093dd02.jpg",
            "name": "骷髅头.jpg",
            "type": "image/jpeg",
            "mtime": "2020-03-25T17:21:19.350Z"
            }
        } */
    //接下来我们要把图片上传到服务器后的路径存储下来（注意该路径必须和其他静态资源路径一样，不能是服务器上的绝对路径）
    //所以我们需要将以上path进行切割保存
    //files.cover.path.split("public")[1];
    //   \uploads\upload_8e027ac7c5e750df95ccd25706f09442.jpg
    try {
      const { title, content } = fileds;
      await verifyArticleInfo({ title, content });
    } catch (error) {
      return next(
        JSON.stringify({ path: "/admin/article-edit?msg=", msg: error.message })
      );
    }

    const article = await Article.create({
      title: fileds.title,
      author: fileds.author,
      publishDate: fileds.publishDate,
      cover: files.cover.path.split("public")[1],
      content: fileds.content
    });
    res.redirect("/admin/article");
  });
};
