# StudyExerciseNodejs-blog 项目流程

- ### 1、创建项目根目录

  - model
  - public
  - router
  - views

- ### 2、初始化模块依赖文件（package.json）

  - 在项目目录下使用 powershell 等命令工具输入如下命令进行初始化

```node.js
 npm init -y
```

- ### 3、下载该项目初定的第三方模块

  - #### 3.1、第三方项目库模块

    - `express`

    - `mongoose`

    - `art-template`

    - `express-art-template`

    - `body-parser`

```node.js
 npm install express mongoose art-template express-art-template body-parser
```

- #### 3.2、第三方命令行工具模块

  - `nodemon`

- ### 4、项目根目录下建立项目入口文件

  - #### 4.1、项目主文件 ==app.js==

    - 该文件中创建服务程序文件

    ```node.js
    const express = require("express");

    //创建 web 服务程序
    const app = express();

    //设置服务程序端口
    app.listen(80, () => {
      console.log("服务程序启动成功请访问");
    });
    ```

- ### 5、创建对应资源文件的二级路由 router

  - ### 5.1、项目 router 文件夹创建首页路由文件 ==home.js==

    - 该文件中创建二级路由`home`代码如下

    ```node.js
    //home页面资源二级路由文件

    //导入express框架
    const express = require("express");
    //创建home二级路由对象
    const home = express.Router();
    //创建home二级路由
    home.get("/", (req, res) => {
      res.send("欢迎进入blog首页");
    });

    //将二级路由对象home作为模块成员导出(将在项目主程序app.js文件中与一级路由拼接)
    module.exports = home;
    ```

  - ### 5.2、项目 router 文件夹创建首页路由文件 ==admin.js==

    - 该文件中创建二级路由`admin`代码如下

    ```node.js
    //admin页面资源二级路由文件

    //导入express框架
    const express = require();

    //创建admin二级路由对象
    const admin = express.Router();

    //创建admin二级路由
    admin.get("/", (req, res) => {
      res.send("欢迎进入admin页面");
    });

    //将admin二级路由作为模块成员导出(将在项目主程序app.js文件中与一级路由拼接)
    module.exports = admin;
    ```

- ### 6、项目主文件 ==app.js== 中创建一级路由并指向二级路由

  - #### 6.1、完整路由

    - `app.js`文件中 router 代码如下

    ```node.js
    //当如express框架
    const express = require("express");
    //创建服务程序
    const app = express();

    //=====================================
    //创建资源路由
    //先导入二级资源路由对象home和admin
    const home = require("./router/home");
    const admin = require("./router/admin");
    app.use("/home", home);
    app.use("/admin", admin);
    //=====================================

    //设置服务程序端口
    app.listen(80, () => {
      conslon.log("服务程序已启动请访问");
    });
    ```

- ### 7、静态资源 router

  - #### 7.1 配置 public 文件夹下静态资源文件路由

    - `app.js`文件

    ```node.js
    //当如express框架
    const express=require('express');
    //创建服务程序
    const app=express();

    //=====================================
    //过滤所有请求，当url与下面设置的静态资源路径下的资源路径相匹配时就响应对应的静态资源
    app.use(express.static(path.join(__dirname,'public'));
    //=====================================

    //创建资源路由
    //先导入二级资源路由对象home和admin
    const home=require('./router/home');
    const admin=require('./router/admin');
    app.use('/home',home);
    app.use('/admin',admin);
    //设置服务程序端口
    app.listen(80,()=>{
    	conslon.log("服务程序已启动请访问")
    })
    ```

- ### 8、创建页面资源模板

  - #### 8.1、views 文件夹下创建页面资源模板

    - views 文件夹下创建好页面 HTML 文件
    - 将 HTML 文件后缀名改为`.art` （因为我们之前安装的模板模块为`art-template`）

  - #### 8.2、app.js 文件中配置模板信息

    - 在 express 框架中设置模板文件位置(注意 set 方法第一个参数为 express 框架中的固定写法，第二个参数指定模板路径)
      `app.set('views',path.join(__dirname,"views"))`
    - 在 express 框架中设置模板文件默认后缀
      `app.set('view engine','art')`
    - 在 express 框架中设置使用的模板文件（express 框架可以同时使用多个模板引擎）
      `app.engine("art", require("express-art-template"));`

    ```node.js
    const express = require("express");
    const path = require("path");
    //创建web服务程序
    const app = express();

    //=====================================
    //告诉express框架模板位置在哪里（第一个参数是固定写法框架规定的）
    app.set("views", path.join(__dirname, "views"));
    //告诉模板的默认后缀
    app.set("view engine", "art");
    //配置模板引擎(因为express框架允许同时使用多个模板引擎)
    app.engine("art", require("express-art-template"));
    //=====================================

    //静态资源路由(原理就是接收所有请求将请求url直接在指定的根目录下进行匹配)
    app.use("/a", express.static(path.join(__dirname, "public")));
    //导入项目资源二级路由模块成员
    const home = require("./router/home");
    const admin = require("./router/admin");
    //创建项目一级路由(并指向二级路由)
    app.use("/home", home);
    app.use("/admin", admin);
    //设置服务程序端口
    app.listen(80, () => {
      console.log("服务程序启动成功请访问");
    });
    ```

  - #### 8.3、admin 路由文件中读取模板和响应模板

    - admin.js 文件中通过 admin 路由对象的 render('app.js 文件中指定的 views 路径下的剩余路径')读取模板并响应给客户端

    ```node.js
    //blog博客管理页面二级路由router

    const express = require("express");
    //创建admin路由对象
    const admin = express.Router();
    //创建admin路由
    admin.get("/login", (req, res) => {
      //===============================
      res.render("admin/login");
      //===============================
    });
    //将admin路由router作为模块成员进行导出
    module.exports = admin;
    ```

  - #### 8.4、模板文件中的外链资源路径问题
    - 默认是请求地址路径的相对路径（比如请求地址路径为http://127.0.0.1/abc/login那么外链资源的相对路径为abc）
    - 那么当外链资源路径的上层文件夹不是 abc 是就会访问不到
    - 因此要将模板文件中的外链地址改为绝对路径，绝对路径指向 app.js 文件中指定的静态文件夹之下即可一般就是 public 文件夹下
    - 模板文件中通过在外链路径最前面前加上/即表示绝对路径，然后再加上 public 文件夹下所对应资源的全路径

- ### 9、页面资源模板优化

  - #### 9.1、抽离页面公共部分

    - 在当前页面资源模板所在目录下新建 common 文件夹
    - 将该目录中所有资源模板中的公共部分剪切出来并在 common 文件夹下建立对应的模板文件.art 粘贴进去
    - 再在被提取的模板文件中使用 {{include '公共模板相对路径'}}引入即可

    - 本项目 views 文件夹下 admin 文件夹里的管理端页面资源模板文件中，头部和左侧边栏代码是相同的因此可以抽离出来建立对应的 header.art 模板文件和 aside.art 模板文件，再在被抽离了公共部分代码的文件对其进行引入

    ```node.js
    {{include './common/header.art'}}

    {{include './common/aside.art'}}
    ```

  - #### 9.2、骨架模板继承

    - 将模板的基本骨架提取出来并在 common 文件夹中建立对应的 layout.art 文件
    - 在 layout.art 文件同通过如下代码在放置的位置进行挖坑

    ```node.js
     {{block 'link'}}{{/block}}
     {{block 'main1'}}{{/block}}
     {{block 'script'}}{{/block}}
    ```

    - 然后把其他模板的骨架全部剔除，通过如下代码进行继承

    ```node.js
    {{extend './common/layout.art'}}
    ```

    - 然后再在继承了 layout.art 模板的子模板中对哇的坑进行自定义代码

    ```art
    {{block 'link'}}写入该页面需求 HTML 代码{{/block}}
    {{block 'main1'}}写入该页面需求 HTML 代码{{/block}}
    {{block 'script'}}写入该页面需求 HTML 代码{{/block}}
    ```

- ### 10、登录功能

  - #### 10.1、建立数据库链接初始化管理员用户

    - 在 model 文件夹下创建`connect.js`文件在其中写数据库链接

    ```node.js
    //向数据库建立链接
    mongoose
      .connect("mongodb://127.0.0.1/blog", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("数据库链接成功");
      })
      .catch(err => {
        console.log("数据库链接失败");
      });
    ```

    - 在 model 文件夹下创建`user.js`文件在其中创建用户集合规则创建初始化管理员用户

    ```node.js
    //创建用户集合
    //导入mongoose数据库管理模块
    const mongoose = require("mongoose");

    //创建集合规则
    const schema = new mongoose.Schema({
      username: {
        type: String,
        required: [true, "用户名必填"],
        minlength: [2, "用户名长度不够"],
        maxlength: [20, "用户名长度太长"]
      },
      email: {
        type: String,
        //保证插入数据不重复
        unique: [true, "数据库里已经插入了该邮箱"],
        required: [true, "邮箱必须填写"]
      },
      password: {
        type: String,
        required: [true, "密码必须填写"]
      },
      role: {
        type: String,
        required: [true, "角色必选"],
        enum: {
          values: ["admin", "normal"], //超级管理用户admin  普通用户normal
          message: "角色设置错误"
        }
      },
      state: {
        //状态0启用 1禁用
        type: Number,
        default: 0 //默认为0
      }
    });
    // 创建集合
    const User = mongoose.model("User", schema);

    // 初始化管理员用户
    User.create({
      username: "guanliyuan",
      email: "123@qq.com",
      password: "123456",
      role: "admin",
      state: 0
    })
      .then(doc => {
        console.log("用户创建成功");
      })
      .catch(err => {
        console.log("用户创建失败");
        for (var attr in err.errors) {
          console.log(err.errors[attr][message]);
        }
      });

    //将User作为模块成员导出
    module.exports = { User };
    ```

    - 在`app.js`文件中先导入`connect.js`再导入`user.js` (模块再使用 require 导入的时候就会自动执行)

    ```
    //链接数据库
    require("./model/connect");
    require("./model/user");

    //注意当运行完查看数据库有数据后请把创建初始管理员代码注释掉以免每次执行都会去创建
    ```

  - #### 10.2、设置登录表单请求地址，请求方式（post）
  - #### 10.3、设置登录请求路由
  - #### 10.4、post 请求参数处理

  ```node.js
  //导入body-parser第三方模块处理post请求参数
  const bodyParser = require("body-parser");
  //设置处理post请求参数方式（extended:false表示用系统模块querystring处理extended:true表示采用第三方模块处理）
  app.use(bodyParser.urlencoded({ extended: false }));
  ```

  - #### 10.5、前端对表单内容进行验证 后端同样要先对表单进行验证 再比对数据库

- ### 11、密码加密（bcrypt）

  - #### 11.1 安装 bcrypt 加密模块前需要先安装如下依赖
    - python（要配置好环境变量）
    - npm install node-gyp -g
    - npm install --global --production windows-build-tools
    - npm install bcrypt
  - #### 11.2、加密密码

    ```
      //导入加密模块对象
      const bcrypt = require("bcrypt");
      // //创建文档
       async function createUser() {
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash("123456", salt);
        const user = User.create({
          username: "guanliyuan",
          email: "123@qq.com",
          password: pass,
          role: "admin",
          state: 0
        });
      }
      //createUser();
    ```

  - #### 11.2、匹配密码
    ```node.js
    const bcrypt = require("bcrypt");
    //参数1是输入的明文密码，参数2是数据库的加密密码，bcrypt.compare对两者进行批匹配
    let isValid = await bcrypt.compare(password, user.password);
    ```

- ## 12、cookie 与 session 记录登录状态

  - ### 12.1、node.js 文件中需要借助 express-session 实现 session 功能

    - 安装 express-session 模块(express-session 也是基于 express 框架实现的)

    ```node.js
      npm install express-session
    ```

    - app.js 文件中

    ```node.js
    //导入session模块
    const session = require("express-session");
    //配置session
    app.use(
      session({ resave: true, saveUninitialized: true, secret: "secret key" })
    );
    ```

    - admin.js 文件的/login 路由中就可以使用 session 了（注意当服务器重启后 session 就会失效）

    ```node.js
    //当密码验证成功登录后将用户名存在req.session.username中
    const bcrypt = require("bcrypt");
    //参数1是输入的明文密码，参数2是数据库的加密密码，bcrypt.compare对两者进行批匹配
    let isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      req.session.uaername = user.name;
      //req能获取express框架的app对象然后通过app.locals.将数据报了出去让所有模板都可以访问userInfo了
      req.app.locals.userInfo = user;
    }
    ```

- ## 12、登录拦截

  - ### 12.1、在项目根目录下新建 middleware 文件放置中间件函数模块

    - 新建 loginGuard.js 文件为登录拦截中间件

    ```node.js
    //中间件函数
    //登录拦截中间件
    const guard = (req, res, next) => {
      //所有一级路由为/admin的请求会进入该中间件
      if (req.url != "/login" && !req.session.username) {
        //通过二级路由判断不是访问登录页面，再判断session没有记录登录状态
        //重定向至登录页面
        res.redirect("/admin/login");
      } else {
        //放行请求
        next();
      }
    };

    module.exports = guard;
    ```

    app.js 文件中导入

    ```node.js
    //拦截请求，app.use()是按顺序执行的，在所有路由前使用该中间件拦截所以请求
    app.use("/admin", require("./middleware/loginGuard"));
    ```

- ## 13、退出登录

  - ### admin.js 文件

  ```node.js
  //退出登录路由
  admin.get("/logout", require("./admin/logout"));
  ```

  - ### admin 文件夹下 logout.js 文件

  ```node.js
  //删除Cookie值，重定向到登录页面
  module.exports = (req, res) => {
    req.session.destroy(function() {
      res.clearCookie("connect.sid");
      res.redirect("/admin/login");
    });
  };
  ```

- ## 14、路由代码优化
  - ### 14.1、在 router 文件夹下建立 admin 文件夹用于放置 admin.js 文件中各个路由的实际逻辑操作函数，每个路由的逻辑函数都单独建一个 js 文件通过 module.exports 导出
  - ### 14.2、在 admin.js 文件的各个路由第二个参数中进行对应的导入
- ## 15、表单验证模块 joi

  - 安装和使用

    ```node.js
    npm install joi
    //导入验证用户表单第三方模块
    const Joi = require("joi");
    //定义验证规则
    const schema = {
        username: Joi.string()
          .min(2)
          .max(12)
          .required()
          .error(new Error("用户名不合法")),
        email: Joi.string()
          .email()
          .required()
          .error(new Error("邮箱格式错误")),
        password: Joi.string()
          .regex(/^[a-zA-Z0-9]{3,30}$/)
          .required()
          .error(new Error("密码不合法")),
        role: Joi.string()
          .valid("admin", "normal")
          .required()
          .error(new Error("角色不合法")),
        state: Joi.string()
          .valid("0", "1")
          .required()
          .error(new Error("状态不合法"))
      };

    try {
        //验证输入的表单信息与表单填写规则是否匹配，不匹配则抛出错误让try进行捕获
        await Joi.validate(req.body, schema);
      } catch (error) {
        //打印验证失败信息
        log(error.message);
      }
    ```

- ## 16、分页功能

  ```node.js
  async (req, res) => {
    //数据分页功能
    const page = req.query.page || 1;
    //定义一页显示10条数据
    const pagesize = 10;
    //查询数据库中的所有数据条数
    const allsize = await User.countDocuments({});
    //计算所有数据要分多少页显示
    const allpage = Math.ceil(allsize / pagesize);
    //数据查询
    const users = await User.find()
      .limit(pagesize)
      .skip((page - 1) * pagesize);
    res.render("admin/user", {
      msg: req.session.username,
      alluser: users,
      page: page,
      allpage: allpage
    });
  };
  ```

  ```node.js
   <!-- 分页 -->
    <ul class="pagination">
          <li style="display:<%==page==1?"none":"inline"%>">
    <a href="/admin/user?page=<%=page==1?page:page-1%>">
          </li>
          <% for(var i=1;i<=allpage;i++){%>
          <li>
          <a style="background-color:<%=page==i?'rgb(252, 200, 226);':'#FFF;'%>" href="/admin/user?page=<%=i%>">{{i}}</a></li>
        <%}%>
          <li style="display:<%==page==allpage?"none":"inline"%>" >
              <a  href="/admin/user?page=<%=page==allpage?page:page-0+1%>">
          </li>
      </ul>
   <!-- /分页 -->
  ```

- ## 16、删除用户

  - ### 16.1、在模板文件中通过自定义属性 data-id 保存到点击的按钮上

  ```node.js
   {{each alluser}}
           <tr>
               <td>{{@$value._id}}</td>
               <td>{{$value.username}}</td>
               <td>{{$value.email}}</td>
               <td>{{$value.role=='normal'?'普通用户':'超级管理员'}}</td>
               <td>{{$value.state=='0'?'正常':'禁用'}}</td>
               <td>
                   <a href="/admin/user-edit?id={{@$value._id}}" class="glyphicon glyphicon-edit"></a>
                   <i class="glyphicon glyphicon-remove del" data-toggle="modal" data-id="{{@$value._id}}" data-target=".confirm-modal"></i>
               </td>
           </tr>
    {{/each}}
  ```

  - ### 16.2、点击按钮时获取其自定义属性确认对话框中采用隐藏表单
    ```node.js
    {{block 'script'}}
      <script type="text/javascript">
          $('.del').on('click',function(){
              var idss= $(this).attr("data-id");
              console.log(idss);
            $("#delUserId").val(idss);
          });
      </script>
    {{/block}}
    ```

- ## 17、事件中的回调函数不要使用箭头函数（this 指向问题）
- ## 18、涉及文件上传的表单必须指定编码方式

  - ### 18.1、设置方式

    - enctype="multipart/form-data" （二进制含有文件上传的情况下使用）
    - enctype="application/x-www-form-urlencoded" (默认)
    - enctype="text/plain"

  - ### 18.2、设置为二进制编码的表单数据处理
    - 原来 app.js 文件中的第三方库是解析不了的
      ```node.js
      //导入处理post请求参数模块
      const bodyParser = require("body-parser");
      app.use(bodyParser.urlencoded({ extended: false }));
      //设置处理post请求参数方式（extended:fals表示用系统模块querystring处理extended:tru表示采用第三方模块处理）
      app.use(bodyParser.urlencoded({ extended: false }));
      ```
  - ### 18.3、采用 formidable 第三方来解析二进制编码的表单提交参数

    - 作用：解析表单，支持 get 请求参数，post 请求参数，文件上传解析

    ```node.js
    //安装该库
    npm install formidable

    //添加文章表单路由

      //导入模块formidable表单处理模块
      const formidable = require("formidable");
      const path = require("path");
      //导入文章集合
      const { Article } = require("../../model/article");
      module.exports = async (req, res) => {
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

    ```

- ## 19、读取图片并预览
  ```node.js
  //实现图片上传预览功能
  //获取上传控件
  var file = document.querySelector("#file");
  //获取上传图片预览控件
  var preview = document.querySelector("#preview");
  //监听是否选择文件
  file.onchange = function() {
    //选择文件后创建文件读取对象
    var reader = new FileReader();
    //用户已选择文件列表（默认就是数组类型因为可以实现选择多个文件）
    this.files[0];
    //读取文件（该方法为异步方法）
    reader.readAsDataURL(this.files[0]);
    //监听读取完成
    reader.onload = function() {
      //打印读取得编码看看该值可以直接让img标签的src属性使用
      console.log(reader.result);
      //将上传的文件在img标签中显示
      preview.src = reader.result;
      preview.style.width = "200px";
    };
  };
  ```
- ## 20、日期格式处理

  ```node.js
  //导入日期格式处理模块
  const dateformat = require("dateformat");
  //全局配置dateformat
  //导入模板在向模板中导入dateformat
  const template = require("art-template");
  template.defaults.imports.dateformat = dateformat;

  //模板中使用日期处理
   <td>{{dateformat($value.publishDate,"yyyy-mm-dd")}}</td>

  ```

- ## 21、用第三方模块实现分页功能 mongoose-sex-page

- ## 22、MongoDB 检索所有记录，但是当我尝试通过 id 检索仅 1 条记录时，我得到了 CastError。
  CastError: Cast to ObjectId failed for value ""5e7b9e45d4cff37070ad0ab9"" at path "\_id" for model "Article"
  从 MongoDB 查询出来的 id 是 ObjectId 类型的,在模板中使用该 id 值时必须这样写{{@$value._id}}不能直接写{{$value._id}}第二种写法会保留双引号导致通过{{$value._id}}得到的 id 值再向数据库中查询时他是含有双引号的因此会出现不能转换问题
- ## 23、mongoodb 添加账号密码

  - ### 23.1、mongoodb 默认免账号密码登录
  - ### 23.2、设置账号密码
  - #### (1)、系统管理员方式运行 powershell
  - #### (2)、输入 `mongo` 链接数据库
  - #### (3)、查看已有的数据库输入`show dbs`
  - #### (4)、mongodb 必须先创建超级管理员账户才能创建普通管理账户
  - #### (5)、先切换到 admin 默认数据库中使用如下命令 `use admin`
  - #### (6)、输入 `db.createUser({user:"root",pwd:"root",roles:["root"]})`创建超级管理员账户 roles 的值是固定写法
  - #### (7)、在为其他数据库创建账户先输入 `use 数据库名` 在输入`db.createUser({user:"itcast",pwd:"itcast",roles:["readWrite"]})`roles 的值是固定写法
  - #### (8)、输入`exit`退出数据库环境
  - #### (9)、需要重新卸载安装 mongo 的服务
    - 停止服务
      `net stop mingodb`
    - 移除服务
      `mongod --remove`
  - #### (10)、重新创建服务
    ```
      mongod --logpath="D:\ZSoftwareDevelop\MongoDB\Server\4.
    2\log\mongod.log"
    --dbpath="D:\ZSoftwareDevelop\MongoDB\Server\4.2\data"
    --install --auth
    ```
    (--logpath 指定日志输出目录，--dbpath 指定数据库保存目录，--install 表示安装 --auth 表示需要验证账号登录)
  - #### (11)、在启动服务 net start mongodb
  - #### (12)、接下来需要些入用户名和密码进行连接
    mongoose.connect('mongodb://itcast:itcast@localhost:/blog);

- ## 23、开发环境和生产环境
  //区分开发环境和生产环境（在不同的环境中项目配置是不一样的，为了避免项目放到生产环境是还有手动手改配置而产生麻烦，开发环境设置：在电脑上配置系统环境变量 NODE_ENV，变量值为 development；生产环境配置：在电脑上配置系统环境变量 NODE_ENV，变量值为 production）
  if (process.env.NODE_ENV == "development") {
  } else if (process.env.NODE_ENV == "production") {
  }
- ## 24、将客户端发送到服务器的请求信息打印到控制台中 morgan 模块
  npm install morgan //安装 morgan 模块
  const morgan = require("morgan");//导入模块
  app.use(morgan("dev")); //在开发环境中将客户端发送到服务器的请求信息打印到控制台中
- ## 25、config 模块
  - 将不同环境中的配置信息抽离到单独的文件中，config 模块内部会自动判断当前的运行环境，并读取对应的配置信息
    - 1、下载安装模块 npm install config
    - 2、在项目根目录下新建 config 文件夹(必须以此命名)
    - 3、在 config 文件夹下新建 default.json、development.json、production.json 文件
    - 4、在项目中通过 require 方法将模块进行导入
      const config=require("config")
    - 5、使用模块内部提供的 get 方法获取配置信息
      config.get()
