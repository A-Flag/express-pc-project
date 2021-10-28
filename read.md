const { query } = require('express')
const express = require('express')

const app =  express()

app.get("/",(req,res)=>{
    res.send('ni hao')
})

app.get("/aeticle",(req,res)=>{
    res.send('新闻页面')
})

app.get("/login",(req,res)=>{
    res.send('登陆页面')
})

app.get("/register",(req,res)=>{
    res.send('注册页面')
})

app.post("/doLogin",(req,res)=>{
    res.send('执行登陆')
})

app.put("/editUser",(req,res)=>{
    console.log('修改用户')
    res.send("修改用户")
})

app.delete("/deleteUser",(req,res)=>{
    console.log('执行删除')
    res.send("执行删除")
})

app.get("/admin/user/add",(req,res)=>{
    console.log('执行删除')
    res.send("admin user add")
})
//动态路由注意顺序
app.get("/aeticle/:id",(req,res)=>{
    var id = req.params('id')
    res.send("动态路由"+id)
})
//传值
app.get("/product",(req,res)=>{
    let query = req.query
    console.log('query',query)
    res.send('product')
})

app.listen(3000)

npm i silly-datetime --save

npm install --save multer

cnpm i -S mkdirp

npm install -g eslint --save

eslint --init 

npm install --save svg-captcha  //图形验证码

npm install express-session --save //session

npm install md5 --save

npm install -g nodemon

//配置模版引擎
app.engine("html",ejs.__express)
app.set("view engine","html")

//配置静态web目录
app.use(express.static("static"))

//配置第三方中间件获取post提交数据
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


具体流程
使用express--mongodb
1.首先进入app.js
    1）先安装，后引用express
    2) 先安装，后引用中间件 body-parser
    3）先安装。后引入嵌套js模版 ejs
    4）先安装，后引用缓存数据express-session
    5）引用自建路由
    6）调用express,配置模版引擎(app.engine(),app.set()),配置静态web目录,配置第三方中间件,配置session,获取post提交数据(app.use())，配置已建路由，监听端口(app.listen(3000))

2)  其中自建路由有: app.use("/admin",admin)/("/api",api)/("/",index)
    ("/",index)===>跳到路由模块routes/index.js;
    里面有一个get方法，
    一般:
   【
    const express = require("express")
    var router = express.Router()
    】
    router.get("/",(req,res)=>{
        // res.send("首页")
        res.render("admin/login/login.html")跳转到登陆页
    })

    一、login.html内容下：
    输入用户 + 密码 + 图形验证码
    使用form表单提交数据 在action里面直接访问调用接口 (如: action="/admin/login/doLogin" method="post" *注意[路由（/admin/login）+接口(/doLogin)])

    -->跳路由页面（/admin/login）
    router.post("/doLogin",async(req,res)=>{
        1)获取输入参数req.body.username
        2)比较输入的验证码是否跟session一致
        --->拓展：校验码获取:使用 先安装svg-captcha，再引入，把把接口获取的验证码放到session里面存储

         <img id="verify_img" src="/admin/login/verify" title="看不清？点击刷新" onclick="javascript:this.src='/admin/login/verify?mt='+Math.random()">

        router.get('/verify', function (req, res) {
            var captcha = svgCaptcha.create();
            // console.log(captcha.text)
            //保存验证码
            req.session.captcha = captcha.text;
            res.type('svg');
            res.status(200).send(captcha.data);
        }); 
        3）再查数据库里面的用户跟密码，如果查询有，登陆成功（成功与失败分装页面）
            拓展查询数据库:
            先新增一个config文件夹放一个config.js//目的:封装专门放路径
            再增加一个model文件夹放core.js //封装连接mongodb数据库 
            先安装mongoose，再引入mongoose和config
            mongoose.connect(config.dbUrl,{useNewUrlParser:true,useUnifiedTopology:true},function(err){
                    if(err){
                        console.log(err);
                        return
                    }
                    console.log('数据库连接成功')
                })

            })
            module.exports = mongoose;

            再新建一个文件夹managerModel，放Schemal来定义好数据类型
            const mongoose = require("./core")
            // var mongoose = require('mongoose')

            let ManagerSchema =  mongoose.Schema({
                username:{type:String},
                password:{type:String},
                email:{type:String},
                mobile:{type:String},
                status:{type:Number,default:1},
            })
            module.exports = mongoose.model('Manager',ManagerSchema,"manager")

            在model文件夹里新建tools.js(里面工程化方法:图片上传，获取当前时间，md5使用)

            //密码需要md5加密 const {md5,getUnix} = require("../../model/tools")
            //引用
            const ManagerModel = require('../../model/managerModel');
            let result = await ManagerModel.find({"username":username,"password":md5(password)})//注意：记得await

        //成功 
        res.render("admin/public/success.html",{
            "redirectUrl":"/admin",
            "message":"登陆成功"
        })

    二、管理员页面

    左边模块封装+顶部模块封装
    使用<%- include("../public/page_header.html")%>引入
    使用iframe来动态选择左边菜单，右边展示不同数据
    <iframe name="rightMain1" id='rightMain1' src="javascript:return false;" style="border:none;" frameborder="false" scrolling="auto" width="100%" height="800px">               
    </iframe>

    使用<li  class="list-group-item"> <a href="/admin/manager" target="rightMain1"> 管理员列表</a></li>

    ** 注意 **: 不同模块定义的Schema不同，所以每个都不能统一使用(里面涉及到获取数据库不同文件下的数据)

    1）展示所有管理员信息
    router.get("/",async (req,res)=>{
    //查询数据
    let result = await ManagerModel.find({})
    // console.log('管理员管理--re',result)
    // res.send("管理员管理")
        res.render("admin/manager/index.html",{
            list:result //传输数据到 admin/manager/index.html
        })
    })


    2）添加管理员
    <form action="/admin/manager/doAdd" method="post" id="form">
    router.post("/doAdd",async (req,res)=>{})
    先获取填写增加数据（判断不能为空）
    再使用用户名查数据库: let result = await ManagerModel.find({"username":username})
    如果能查到说明该用户已存在
    反之，走
    //新增
     var addResult = new ManagerModel({
            username,
            password:md5(password),
            email,
            mobile,
            status,
            addtime:getUnix()
        })
        await addResult.save()
        res.redirect("/admin/manager")

    //编辑
       await ManagerModel.updateOne({"_id":id},{
            "email":email,
            "mobile":mobile,
            "status":status,
            "password":md5(password)
        })

    //删除
      var result = await ManagerModel.deleteOne({"_id":id})
    

