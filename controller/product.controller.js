const productModel = require("../model/product.model")

const pro = async (req, res) => {
    let data = await productModel.create(req.body)
    res.send(data)
}

const proUI = (req, res) => {
    res.render("product")
}

const productGet = async (req, res) => {
    let data = await productModel.find({ userID: req.body.userID })
    res.send(data)
}

module.exports = { pro, proUI, productGet }