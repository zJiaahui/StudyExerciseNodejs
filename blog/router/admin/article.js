const { Article } = require("../../model/article");
//导入数据分页查询模块
const mongooseSexPage = require("mongoose-sex-page");
module.exports = async (req, res) => {
  //标记当前显示的是文章管理页面还是用户管理页面
  req.app.locals.currentLink = "article";
  const page = req.query.page;
  //查询数据
  //page()设置当前页码
  //size()设置当前页显示数据数量
  //display()设置客户端要显示页码的数量
  //exec()向数据库中发送查询请求
  const articles = await mongooseSexPage(Article)
    .find()
    .page(page)
    .size(1)
    .display(3)
    .populate("author")
    .exec();

  /* {
       "page": 1,//查询时设置的当前页
       "size": 2,//查询时设置的当前页数据条数
       "total": 3,//数据库中所有数据条数
       "records": [{ //按数据查询条件查询到的数据
                    "cover": "\\uploads\\upload_97aad070df47cd4c134e262041cb1490.jpg",
                    "_id": "5e7b9826e7476e5f90b06858",
                    "title": "第一篇文章",
                    "author": {
                                "state": 0,
                                "_id": "5e7b313a7c95798c8016a208",
                                "username": "最大管理员",
                                "email": "123@qq.com",
                                "password": "$2b$10$zRp7vzuIxqyd6W7plQORi.VWol0f9SUCyVLK9bejAlr1pNqNGZxym",
                                "role": "admin",
                                "__v": 0
                              },
                    "publishDate": null,
                    "content": "<p>写下我的第一篇博客</p>",
                    "__v": 0
                    },
                    {
                      "cover": "\\uploads\\upload_2fbcbce05b1eb8e3eff20729f8049eab.jpg",
                      "_id": "5e7b9e07d4cff37070ad0ab8",
                      "title": "第二篇文章",
                      "author": {
                                  "state": 0,
                                  "_id": "5e7b313a7c95798c8016a208",
                                  "username": "最大管理员",
                                  "email": "123@qq.com",
                                  "password": "$2b$10$zRp7vzuIxqyd6W7plQORi.VWol0f9SUCyVLK9bejAlr1pNqNGZxym",
                                  "role": "admin",
                                  "__v": 0
                                },
                    "publishDate": null,
                    "content": "<p>第二篇文章</p>",
                    "__v": 0
                    }]
      "pages": 2,
      "display": [1,2]
      }
       */
  //res.send(articles);
  res.render("admin/article.art", { articles: articles });
};
