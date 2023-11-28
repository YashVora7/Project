const mongoose = require("mongoose")
require('dotenv').config()
let URL =  process.env.Offline_URL


const connect = async ()=>{
    await mongoose.connect(URL)
    console.log("Connected to DataBase");
}

module.exports = connect