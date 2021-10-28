const express = require("express")
var router = express.Router()

const ManagerModel = require("../../model/managerModel")
const {md5,getUnix} = require("../../model/tools")

// router.get("/",(req,res)=>{
//     res.send("管理员管理")
// })
router.get("/",async (req,res)=>{
    //查询数据
    let result = await ManagerModel.find({})
    // console.log('管理员管理--re',result)
    // res.send("管理员管理")
    res.render("admin/manager/index.html",{
        list:result
    })
})
router.post("/doAdd",async (req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var rpassword = req.body.rpassword;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var status = req.body.status;
    // console.log('1',username,'2',password,'3',rpassword,'4',email,'5',mobile)
    if(username==""){
        res.render("admin/public/error.html",{
            "redirectUrl":"/admin/manager/add",
            "message":"用户名不能为空"
        })
        return
    }
    if(password.length<6){
        res.render("admin/public/error.html",{
            "redirectUrl":"/admin/manager/add",
            "message":"密码长度不能小于6位"
        })
        return
    }
    if(password !=rpassword){
        res.render("admin/public/error.html",{
            "redirectUrl":"/admin/manager/add",
            "message":"密码与确认密码不一致"
        })
        return
    }

    let result = await ManagerModel.find({"username":username})
    if(result.length>0){
        res.render("admin/public/error.html",{
            "redirectUrl":"/admin/manager/add",
            "message":"当前用户已经存在，请换一个用户"
        })
        return
    }else{
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

    }
    // res.render("admin/manager/edit.html")
})
router.get("/edit",async (req,res)=>{
    var id = req.query.id;
    var result = await ManagerModel.find({"_id":id})
    console.log("result",result)
    if(result.length>0){
        res.render("admin/manager/edit.html",{
            list:result[0]
        })
    }else{
        res.redirect("admin/manager")
    }

    
})
router.post("/doEdit",async (req,res)=>{
    var id = req.body.id;
    // var username = req.body.username;
    var password = req.body.password;
    var rpassword = req.body.rpassword;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var status = req.body.status;
    if(password.length>0){//修改密码
        if(password.length<6){
            res.render("admin/public/error.html",{
                "redirectUrl":'/admin/manager/edit?id='+id,
                "message":"密码长度不能小于6位"
            })
            return
        }
        if(password !=rpassword){
            res.render("admin/public/error.html",{
                "redirectUrl":'/admin/manager/edit?id='+id,
                "message":"密码与确认密码不一致"
            })
            return
        }
        await ManagerModel.updateOne({"_id":id},{
            "email":email,
            "mobile":mobile,
            "status":status,
            "password":md5(password)
        })
    }else{//不修改密码
        await ManagerModel.updateOne({"_id":id},{
            "email":email,
            "mobile":mobile,
            "status":status
        })

    }
    res.redirect("/admin/manager")
})
router.get("/add",async (req,res)=>{
    res.render("admin/manager/add.html")
})
router.get("/delete",async (req,res)=>{
    var id = req.query.id;
    var result = await ManagerModel.deleteOne({"_id":id})
    console.log('result',result)
    res.render("admin/public/success.html",{
        message:"数据删除成功",
        "redirectUrl":"/admin/manager"
    })
})
// router.get("/add",(req,res)=>{
//     var resulte = new ManagerModel({
//         username:"张三",
//         password:"123456"
//     })
//     resulte.save((err)=>{
//         if(err){
//             console.log(err)
//             return
//         }
//         console.log('增加成功')
//     })
//     res.send("增加管理员")
// })



module.exports = router
