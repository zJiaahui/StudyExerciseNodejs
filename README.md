# StudyExerciseNodejs-blog项目流程

- ### 1、创建项目根目录

  - model
  - public
  - router
  - views

- ### 2、初始化模块依赖文件（package.json）

  - 在项目目录下使用 powershell 等命令工具输入如下命令进行初始化

  ```
   npm init -y
  ```

- ### 3、下载该项目初定的第三方模块

  - #### 3.1、第三方项目库模块

    - `express`
    - `mongoose`
    - `art-template`
    - `express-art-template`

  ```
   npm install express mongoose art-template express-art-template
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

    ```
    //home页面资源二级路由文件

    //导入express框架
    const express=require('express');
    //创建home二级路由对象
    const home=express.Router();
    //创建home二级路由
    home.get('/',(req,res)=>{
    	res.send('欢迎进入blog首页');
    });

    //将二级路由对象home作为模块成员导出(将在项目主程序app.js文件中与一级路由拼接)
    module.exports=home;
    ```

  - ### 5.2、项目 router 文件夹创建首页路由文件 ==admin.js==

    - 该文件中创建二级路由`admin`代码如下

    ```
    //admin页面资源二级路由文件

    //导入express框架
    const express=require();

    //创建admin二级路由对象
    const admin=express.Router();

    //创建admin二级路由
    admin.get('/',(req,res)=>{
    res.send('欢迎进入admin页面');
    });

    //将admin二级路由作为模块成员导出(将在项目主程序app.js文件中与一级路由拼接)
    module.exports=admin;

    ```

- ### 6、项目主文件 ==app.js== 中创建一级路由并指向二级路由

  - #### 6.1、完整路由

    - `app.js`文件中 router 代码如下

    ```
    //当如express框架
    const express=require('express');
    //创建服务程序
    const app=express();

    //=====================================
    //创建资源路由
    //先导入二级资源路由对象home和admin
    const home=require('./router/home');
    const admin=require('./router/admin');
    app.use('/home',home);
    app.use('/admin',admin);
    //=====================================

    //设置服务程序端口
    app.listen(80,()=>{
    	conslon.log("服务程序已启动请访问")
    })
    ```

- ### 7、静态资源 router

  - #### 7.1 配置 public 文件夹下静态资源文件路由

    - `app.js`文件

    ```
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

    ```
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

    ```
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

    ```
    {{include './common/header.art'}}

    {{include './common/aside.art'}}
    ```

  - #### 9.2、骨架模板继承

    - 将模板的基本骨架提取出来并在 common 文件夹中建立对应的 layout.art 文件
    - 在 layout.art 文件同通过如下代码在放置的位置进行挖坑

    ```
     {{block 'link'}}{{/block}}
     {{block 'main1'}}{{/block}}
     {{block 'script'}}{{/block}}
    ```

    - 然后把其他模板的骨架全部剔除，通过如下代码进行继承

    ```
    {{extend './common/layout.art'}}
    ```

    - 然后再在继承了 layout.art 模板的子模板中对哇的坑进行自定义代码

    ```
    {{block 'link'}}写入该页面需求 HTML 代码{{/block}}
    {{block 'main1'}}写入该页面需求 HTML 代码{{/block}}
    {{block 'script'}}写入该页面需求 HTML 代码{{/block}}
    ```
