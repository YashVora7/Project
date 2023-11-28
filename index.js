const express = require("express")
const connect = require("./config/db")
const userRoute = require("./routes/user.route")
require('dotenv').config()

const app = express()

app.use(express.json())

app.set("view engine", "ejs")
app.set("views",__dirname+"/view")

app.use(express.urlencoded({extended:true}))


app.use("/user",userRoute)

let PORT = process.env.PORT

app.listen(PORT,()=>{
    connect()
    console.log(`Server on ${PORT}`);
})