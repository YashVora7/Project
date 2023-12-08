const userModel = require("../model/user.model")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

const nodemailer = require("nodemailer")

const otpGenerator = require("otp-generator")

const registerUi = (req, res) => {
    res.render("signup")
}

const register = async (req, res) => {
    let { username, email, password } = req.body

    let data = await userModel.findOne({ email: email })

    if (data) {
        res.redirect("/user/login")
    }

    else {
        bcrypt.hash(password, 5, async (err, hash) => {

            let obj = {
                username: username,
                email: email,
                password: hash
            }

            let value = await userModel.create(obj)
            res.send({ msg: "User Created Successfully", data: value })
        })
    }

}

const login = async (req, res) => {
    let { email, password } = req.body

    let data = await userModel.findOne({ email: email })

    if (data) {
        bcrypt.compare(password, data.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ id: data._id }, "secret")
                res.cookie("token", token).redirect("/product/pro")
            }
            else {
                res.send("Password is incorrect")
            }
        })
    }
    else {
        res.redirect("/user/reg")
    }
}

const loginUi = (req, res) => {
    res.render("login")
}

const productUi = (req, res) => {
    res.render("product")
}

let genOtp;



const mailOtp = (req, res) => {
    genOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    let { email } = req.body;
    const mail = {
        from: "officialyashvora1978@gmail.com",
        to: email,
        subject: "password reset",
        html: `<a href="http://localhost:8080/user/verify/${genOtp}">Click here to verify otp: ${genOtp}</a>`,
    };

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "officialyashvora1978@gmail.com",
            pass: "fmmp xshj cpkc qpzt",
        },
    });

    transport.sendMail(mail, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });

    res.send("OTP Sent");
}

const verifyOtp = (req, res) => {
    let { otp } = req.params;

    if (otp === genOtp) {
        res.status(200).send("Verified OTP");
    } else {
        res.status(400).send("Invalid OTP");
    }
}

module.exports = { register, registerUi, login, loginUi, productUi, mailOtp, verifyOtp }