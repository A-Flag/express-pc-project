const mongoose = require("./core")
// var mongoose = require('mongoose')

let NavSchema =  mongoose.Schema({
    title:{type:String},
    link:{type:String},
    status:{type:Number,default:1},
    position:{type:Number},
    is_opennew:{type:Number},
    sort:{type:Number},
    add_time:{
        type:Number
    }
})
module.exports = mongoose.model('Nav',NavSchema,"nav")