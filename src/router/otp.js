const { Router } = require("express")
const DB = require("../utils/db")
const sendMail = require("../utils/email")
const emailValidation = require("../utils/emailValidation")
const { JWTGenerate } = require("../utils/jwt")
const { OTPGenerator, OTPValidation } = require("../utils/otp")

const otpRouter = Router()

otpRouter.post("/", (req, res) => {
  const { email } = req.body
  if (emailValidation(email)) {
    const key = email.toLocaleLowerCase().replace(/[^a-z]/g, "")
    const otp = OTPGenerator(key)
    sendMail(email, otp)
      .then(() => {
        res.json({ message: "OTP telah dikirim ke email" })
      })
      .catch((e) => {
        console.log(e)
        res.status(500).json({ error: true, message: "Server error!" })
      })
  } else return res.status(400).json({ error: true, message: "Invalid input!" })
})

otpRouter.post("/auth", async (req, res) => {
  const { email, otp } = req.body
  try {
    if (emailValidation(email)) {
      const key = email.toLocaleLowerCase().replace(/[^a-z]/g, "")
      if (OTPValidation(key, otp)) {
        await DB.user.upsert({
          where: { email },
          create: { email },
          update: { email },
        })
        const token = JWTGenerate(email)
        return res.json({ token })
      }
      return res.status(400).json({ error: true, message: "Invalid OTP" })
    }
    return res.status(400).json({ error: true, message: "Invalid input!" })
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: true, message: "Invalid input!" })
  }
})

module.exports = otpRouter
