const express = require("express")
const connect = require("./config/db")
const cookie = require("cookie-parser")
const userRoute = require("./routes/user.route")
const proRoute = require("./routes/product.route")


require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cookie())

app.set("view engine", "ejs")
app.set("views", __dirname + "/view")

app.use(express.urlencoded({ extended: true }))


app.use("/user", userRoute)
app.use("/product", proRoute)

let PORT = process.env.PORT

app.listen(PORT, () => {
    connect()
    console.log(`Server on ${PORT}`);
})