const {Router} = require("express")
const { register, registerUi, login, loginUi, productUi } = require("../controller/user.controller")
const { auth } = require("./middleware/auth")

const userRoute = Router()


userRoute.post("/reg",register)
userRoute.get("/reg",registerUi)
userRoute.post("/login",login)
userRoute.get("/login",loginUi)
userRoute.get("/auth",auth,productUi)

module.exports = userRoute