const http = require("http");
const getRouter = require("router");
const template = require("art-template");
const path = require("path");
const servestatic = require("serve-static");
const url = require("url");
const db = require("./model/student");
const querystring = require("querystring");
const dateformat = require("dateformat");
const router = getRouter();
template.defaults.root = path.join(__dirname, "views");
template.defaults.imports.dateformat = dateformat;
const serve = servestatic(path.join(__dirname));
const appServer = http.createServer();
appServer.on("request", (req, res) => {
  console.log("接收到请求");
  router(req, res, () => {});
  serve(req, res, () => {});
});
appServer.listen(80);
console.log("服务器启动成功");
router.get("/add", (req, res) => {
  console.log("是get请求" + url.parse(req.url, true).pathname);
  const html = template(path.join(__dirname, "views", "submitinfo.art"), {});
  console.log(html);
  res.end(html);
});
router.post("/addstudent", (req, res) => {
  console.log("接收到post请求" + url.parse(req.url, true).pathname);
  let s = "";
  req.on("data", ss => (s += ss));
  req.on("end", async () => {
    console.log(s);
    console.log(querystring.parse(s));
    await db.student
      .create(querystring.parse(s))
      .then(doc => {
        res.writeHead(301, {
          Location: "/all"
        });
        res.end();
      })
      .catch(err => {
        console.log("添加学生信息失败" + err);
        const html = template("submitinfo.art", {});
        res.writeHeader(200, {});
        res.end(html);
      });
  });
});
router.get("/all", async (req, res) => {
  console.log("接收到post请求" + url.parse(req.url, true).pathname);

  await db.student
    .find()
    .then(doc => {
      console.log(doc);
      const html = template(path.join("studentinfo.art"), {
        students: doc
      });
      res.end(html);
    })
    .catch(err => {
      console.log("查询失败");
    });
});
