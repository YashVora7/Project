let jwt = require('jsonwebtoken')

const auth = (req,res,next) =>{
    let token = req.cookies.token

    if(token){
        let decode = jwt.verify(token,"secret")
        next()
    }
    else{
        res.redirect("/user/login")
    }

}

module.exports = {auth}