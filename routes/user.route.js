const { Router } = require("express")
const { register, registerUi, login, loginUi, productUi, mailOtp, verifyOtp } = require("../controller/user.controller")
const { auth } = require("./middleware/auth")

const userRoute = Router()


userRoute.post("/reg", register)
userRoute.get("/reg", registerUi)
userRoute.post("/login", login)
userRoute.get("/login", loginUi)




userRoute.post("/sendotp", mailOtp);

userRoute.get("/verify/:otp", verifyOtp);


userRoute.get("/private", auth, productUi)

module.exports = userRoute