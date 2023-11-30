const userModel = require("../model/user.model")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

const registerUi = (req,res) =>{
    res.render("signup")
}

const register = async(req,res)=>{
    let {username,email,password} = req.body

    let data = await userModel.findOne({email:email})

    if(data){
        res.redirect("/user/login")
    }

    else{
        bcrypt.hash(password,5,async(err,hash)=>{

            let obj = {
                username : username,
                email : email,
                password : hash
            }
    
            let value = await userModel.create(obj)
            res.send({msg : "User Created Successfully",data : value})
        })
    }

}

const login = async(req,res)=>{
    let {email,password} = req.body

    let data = await userModel.findOne({email : email})

    if(data){
        bcrypt.compare(password,data.password,(err,result)=>{
            if(result){
                let token = jwt.sign({id:data._id},"secret")
                res.cookie("token",token).redirect("/product/pro")
            }
            else{
                res.send("Password is incorrect")
            }
        })
    }
    else{
        res.redirect("/user/reg")
    }
}

const loginUi = (req,res) =>{
    res.render("login")
}
const productUi = (req,res)=>{
    res.render("product")
}

module.exports = {register,registerUi,login,loginUi,productUi}