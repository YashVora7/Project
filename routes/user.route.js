const {Router} = require("express")
const { register, registerUi } = require("../controller/user.controller")

const userRoute = Router()


userRoute.post("/reg",register)
userRoute.get("/reg/ui",registerUi)

module.exports = userRoute