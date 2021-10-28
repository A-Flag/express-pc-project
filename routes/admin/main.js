const express = require("express");

var router = express.Router();

router.get('/',(req,res)=>{
    res.render("admin/main/index.html")
})
router.get('/welcome',(req,res)=>{
    res.render("欢迎来到后台管理系统")
})
// router.get("/admin",(req,res)=>{
//     console.log('jinlail111')
//     res.render("admin/main/index.html")
// })
module.exports = router