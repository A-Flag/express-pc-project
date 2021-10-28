const express = require("express")

var router = express.Router()

router.get("/",(req,res)=>{
    // res.send("首页")
    res.render("admin/login/login.html")
})
router.get("/admin",(req,res)=>{
    res.render("admin/main/index.html")
})
module.exports = router
