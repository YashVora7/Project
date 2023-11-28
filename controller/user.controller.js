const userModel = require("../model/user.model")

const bcrypt = require("bcrypt")

const registerUi = (req,res) =>{
    res.render("signup")
}

const register = async(req,res)=>{
    let {username,email,password} = req.body

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

module.exports = {register,registerUi}