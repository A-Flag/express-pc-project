const multer = require('multer')
const path = require('path')
const sd = require('silly-datetime')
// const mkdirp = require('mkdirp')
const md5 = require("md5")

let tools = {
    multer(){
        // var storage = multer.diskStorage({
        //     //配置上传目录
        //     destination:async(req,file,cb)=>{
        //         //获取当前日期20200703
        //         let day = sd.format(new Date(),'YYYYMMDD')
        //         //static/upload/20200703
        //         let dir = path.join('static/upload',day)
        //         //2.按照日期生成图片存储目录，mkdirp是一个异步方法
        //         // await mkdirp(dir)
        //         cb(null,dir)
        //     },
        //     //修改上传后的文件名
        //     filename:(req,file,cb)=>{
        //         //1.获取后缀名
        //         let extname = path.extname(file.originalname)
        //         //2.根据时间戳生成文件名
        //         cb(null,Date.now()+extname)
        //     }
        // })
        var storage = multer.diskStorage({
            //配置上传目录
            destination:async(req,file,cb)=>{
                //获取当前日期20200703
                // let day = sd.format(new Date(),'YYYYMMDD')
                // //static/upload/20200703
                // let dir = path.join('static/upload',day)
                //2.按照日期生成图片存储目录，mkdirp是一个异步方法
                // await mkdirp(dir)
                cb(null,'static/upload')
            },
            //修改上传后的文件名
            filename:(req,file,cb)=>{
                //1.获取后缀名
                let extname = path.extname(file.originalname)
                let day = sd.format(new Date(),'YYYYMMDDHHmmss')
                //2.根据时间戳生成文件名
                cb(null,day+extname)
            }
        })
        var upload = multer({storage:storage})
        return upload;
    },
    md5(str){
        return md5(str)
    },
    getUnix(){
        var d = new Date()
        return d.getTime()
    }
}

module.exports = tools

