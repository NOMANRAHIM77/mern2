const cookieParser = require('cookie-parser')
const express=require('express')
const app=express()
const path=require('path')
const usermodel=require("./models/user")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

app.set('view engine','ejs')
app.set(express.json())
app.use(express.urlencoded({extenetd:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())

app.get('/',(req,res) => {
    res.render('index')
})

app.post('/create',   (req,res) => {
    let {name,email,password,age} = req.body
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{
        let createduser=  await usermodel.create({
            name,
            email,
            password:hash,
            age
        })
        res.send(createduser)
    })
    
})
 
   
})

app.get('/login',(req,res) => {
    res.render('login')
})

app.post('/login', async (req,res) => {
   let user=await usermodel.findOne({email:req.body.email})
   console.log(user)
   if(!user) return res.send("something went wrong")

    bcrypt.compare(req.body.password,user.password,function (err,result) {
        if(result) res.send("you can login")
            else res.send("you can not login")
    })
})




app.listen(3000)
  

