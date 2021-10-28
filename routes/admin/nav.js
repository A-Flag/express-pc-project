const express = require("express")
const tools = require("../../model/tools")
const NavModel = require("../../model/navModel")
const { getUnix } = require("../../model/tools")

var router = express.Router()

router.get("/",async (req,res)=>{
    var result = await NavModel.find({})
    
    res.render("admin/nav/index.html",{
        list:result
    })
})
router.get("/add",async(req,res)=>{

    res.render("admin/nav/add.html")
})

router.post("/doAdd",async(req,res)=>{
    // var title = req.body.title;
    // var link = req.body.link;
    // var position = req.body.position;
    // var is_opennew = req.body.is_opennew;
    // var sort = req.body.sort;
    // var status = req.body.status;
    // let {title,link,position,is_opennew,sort,status}= req.body;

    var result = new NavModel(Object.assign(req.body,{add_time:getUnix()}))
    
    await result.save()
    res.render("admin/public/success.html",{
        "message":"增加数据成功",
        "redirectUrl":"/admin/nav"
    })
})
router.get("/edit",async (req,res)=>{
    var id = req.query.id;
    var result = await NavModel.find({"_id":id})

    if(result.length>0){
        res.render("admin/nav/edit.html",{
            list:result[0]
        })
    }else{
        res.redirect("admin/nav")
    }

    // res.send("修改导航")
})
router.post("/doEdit",async(req,res)=>{
    // var title = req.body.title;
    // var link = req.body.link;
    // var position = req.body.position;
    // var is_opennew = req.body.is_opennew;
    // var sort = req.body.sort;
    // var status = req.body.status;
    // let {title,link,position,is_opennew,sort,status}= req.body;

    var result = await NavModel.updateOne({"_id":req.body.id},req.body)
    
    // await result.save()
    res.render("admin/public/success.html",{
        "message":"修改成功",
        "redirectUrl":"/admin/nav"
    })
})

module.exports = router
