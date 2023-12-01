const { Router } = require("express")
const { auth } = require("./middleware/auth")
const { pro, proUI, productGet } = require("../controller/product.controller")

const proRoute = Router()


proRoute.post("/pro", auth, pro)
proRoute.get("/pro", proUI)
proRoute.get("/products", auth, productGet)


module.exports = proRoute