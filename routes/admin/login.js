const express = require("express")
const svgCaptcha = require('svg-captcha');
const ManagerModel = require('../../model/managerModel');
const md5 = require("md5")

var router = express.Router()

router.get("/",async (req,res)=>{
    // res.send("登陆11")
    // let resulte = new ManagerModel({
    //     username:'admin',
    //     password:md5('123456')
    // })
    res.render("admin/login/login.html")

    await resulte.save()
})
router.post("/doLogin",async(req,res)=>{
    let username = req.body.username;
    let password = req.body.password
    let verify = req.body.verify
    //判断验证码是否正确--用户密码是否合法
    // if(verify.toLocaleLowerCase() != req.session.captcha.toLocaleLowerCase()){
    //     // res.send("验证码错误")
    //     res.render("admin/public/error.html",{
    //         "redirectUrl":"/admin/login",
    //         "message":"图形验证码错误"
    //     })
    //     return
        
    // }
       let result = await ManagerModel.find({"username":username,"password":md5(password)})
        console.log('result--1',result)
        if(result.length>0){
            //保存用户信息
            req.session.userinfo = result[0]
             // 提示登陆成功
            res.render("admin/public/success.html",{
                "redirectUrl":"/admin",
                "message":"登陆成功"
            })
        }else{
            res.render("admin/public/error.html",{
                "redirectUrl":"/admin/login",
                "message":"用户名或者密码错误"
            })
        }
   
    // 验证成功
    // res.render("admin/public/success.html",{
    //     "redirectUrl":"/admin",
    //     "message":"登陆成功"
    // })
})


 
router.get('/verify', function (req, res) {
    var captcha = svgCaptcha.create();
    // console.log(captcha.text)
    //保存验证码
    req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});

router.get('/loginOut', function (req, res) {

    req.session.userinfo = null;
    res.redirect('/admin/login')
});
module.exports = router
