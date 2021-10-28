// const { query } = require('express')
const express = require('express')
//引用第三方中间件做数据解析
const bodyParser = require('body-parser')
//数据存储
const session = require("express-session")
//嵌入js模版
const ejs = require('ejs')

//引入路由
const admin = require('./routes/admin')
const index = require('./routes/index')
const api = require('./routes/api')

//调用express
const app =  express()


//配置模版引擎
app.engine("html",ejs.__express)
app.set("view engine","html")
//配置静态web目录
app.use(express.static("static"))
//配置第三方中间件获取post提交数据
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//配置session
// var session = require('express-session')
// var MemoryStore = require('memorystore')(session)

app.use(session({
    cookie: { 
        // maxAge: 1000*60*30,
        maxAge: 1000*60*1,
        secure:false //true 表示只有https才可以访问
    },
    name:'itying',
    resave: false,//强制保存session 及时没有变化
    saveUninitialized:true,//强制将未初始化的session
    secret: 'this is session',
    rolling:true //在每次请求时强行设置cookie,这将重置cookie过期时间（默认false）
}))

//配置外部路由模块
app.use("/admin",admin)
app.use("/api",api)
app.use("/",index)

//监听端口，端口号为3000
app.listen(3010)