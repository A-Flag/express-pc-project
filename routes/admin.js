const express = require("express")
var router = express.Router()
const url = require("url")

//判断用户是否登陆
router.use((req,res,next)=>{
    console.log(req.url)
    var pathname = url.parse(req.url).pathname
    console.log('pathname',pathname)
    if(req.session.userinfo && req.session.userinfo.username){
        next()
    }else{
        if(pathname=="/login"||pathname=="/login/doLogin"||pathname=="/login/verify"){
            next()
        }else{
            res.redirect("/admin/login")
        }
       
    }
})

//引入模块
const main = require("./admin/main")
const user = require("./admin/user")
const login = require("./admin/login")
const nav = require("./admin/nav")
const manager = require("./admin/manager")
const path = require("path")
const focus = require("./admin/focus")

// router.get("/",(req,res)=>{
//     // res.send("后台管理中心")
//     res.render("admin/main/index.html")
// })

//挂载路由
router.use("/main",main)
router.use("/user",user)
router.use("/login",login)
router.use("/nav",nav)
router.use("/manager",manager)
router.use("/focus",focus)

module.exports = router
