const express = require("express");
const {multer} = require("../../model/tools")
const FocusModel = require("../../model/focusModel")
// const sd = require('silly-datetime')
// const multer = require("multer")
// const path = require('path')
// var storage = multer.diskStorage({
//     //配置上传目录
//     destination:async(req,file,cb)=>{
//         //获取当前日期20200703
//         // let day = sd.format(new Date(),'YYYYMMDD')
//         // //static/upload/20200703
//         // let dir = path.join('static/upload',day)
//         //2.按照日期生成图片存储目录，mkdirp是一个异步方法
//         // await mkdirp(dir)
//         cb(null,'static/upload')
//     },
//     //修改上传后的文件名
//     filename:(req,file,cb)=>{
//         //1.获取后缀名
//         let extname = path.extname(file.originalname)
//         console.log('extname',extname)
//         let day = sd.format(new Date(),'YYYYMMDDHHmmss')
//         //2.根据时间戳生成文件名
//         cb(null,day+extname)
//     }
// })
// var upload = multer({storage:storage})
var router = express.Router();

router.get('/',async(req,res)=>{
    let result = await FocusModel.find({})
    res.render("admin/focus/index.html",{
        list:result
    })
    res.send("轮播图列表")
})
router.get("/add",async(req,res)=>{
    res.render("admin/focus/add.html")
})
router.post("/doAdd",multer().single("focus_img"),async (req,res)=>{
    console.log(req.body,req.file)
    var focus_img = req.file?(req.file.path+'').substr(7):""
    var focusImgObj = {"focus_img":focus_img}
    var result = new FocusModel(Object.assign(req.body,focusImgObj))
    await result.save()
    res.redirect("/admin/focus")
    // res.send("上传成功")
})
router.get("/edit",async (req,res)=>{
    var id = req.query.id;
    var result = await FocusModel.find({"_id":id})
    console.log("result",result)
    if(result.length>0){
        res.render("admin/focus/edit.html",{
            list:result[0]
        })
    }else{
        res.redirect("admin/focus")
    }

    
})

router.post("/doEdit",multer().single("focus_img"),async (req,res)=>{
    var id = req.body.id;
    try{
        console.log('req.file.path',req.file)
        if(req.file){
            console.log('11111')
            var focus_img = req.file?(req.file.path+'').substr(7):"";
            var focusImgObj = {"focus_img":focus_img}
            await FocusModel.updateOne({"_id":id},Object.assign(req.body,focusImgObj))
        }else{
            console.log('22222')
            await FocusModel.updateOne({"_id":id},req.body)
        }
        res.redirect("/admin/focus")
    }catch(error){
        res.render("admin/public/error.html",{
            "redirectUrl":"/admin/focus/edit?id="+id,
            "message":"修改数据失败"
        })
    }
    
})

router.get("/delete",async (req,res)=>{
    var id = req.query.id;
    var result = await FocusModel.deleteOne({"_id":id})
    console.log('result',result)
    res.render("admin/public/success.html",{
        message:"数据删除成功",
        "redirectUrl":"/admin/focus"
    })
})
module.exports = router