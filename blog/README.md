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

* ## 14、路由代码优化
  - ### 14.1、在 router 文件夹下建立 admin 文件夹用于放置 admin.js 文件中各个路由的实际逻辑操作函数，每个路由的逻辑函数都单独建一个 js 文件通过 module.exports 导出
  - ### 14.2、在 admin.js 文件的各个路由第二个参数中进行对应的导入
