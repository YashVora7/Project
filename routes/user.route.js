const { Router } = require("express")
const { register, registerUi, login, loginUi, productUi } = require("../controller/user.controller")
const { auth } = require("./middleware/auth")
const otpGenerator = require("otp-generator")
const nodemailer = require("nodemailer")

const userRoute = Router()


userRoute.post("/reg", register)
userRoute.get("/reg", registerUi)
userRoute.post("/login", login)
userRoute.get("/login", loginUi)
let genOtp;

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "officialyashvora1978@gmail.com",
        pass: "fmmp xshj cpkc qpzt",
    },
});

userRoute.post("/sendotp", (req, res) => {
    genOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    let { email } = req.body;
    const mail = {
        from: "officialyashvora1978@gmail.com",
        to: email,
        subject: "password reset",
        html: `<a href="http://localhost:8080/user/verify/${genOtp}">Click here to verify otp: ${genOtp}</a>`,
    };
    transport.sendMail(mail, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });

    res.send("OTP Sent");
});

userRoute.get("/verify/:otp", (req, res) => {
    let { otp } = req.params;

    if (otp === genOtp) {
        res.status(200).send("Verified OTP");
    } else {
        res.status(400).send("Invalid OTP");
    }
});


userRoute.get("/private", auth, productUi)

module.exports = userRoute