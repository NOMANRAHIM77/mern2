const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/authrapp')


const userschema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number
})

module.exports = mongoose.model('user',userschema)