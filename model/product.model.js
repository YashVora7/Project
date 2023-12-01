const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        title: String,
        desc: String,
        img: String,
        price: Number,
        userID: String
    }
)

const productModel = mongoose.model("product", productSchema)

module.exports = productModel