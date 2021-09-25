const otp = require("totp-generator")
const secret = process.env.SECRET

const OTPGenerator = (key) => {
  return otp(secret + key, { digits: 6, period: 10 * 60 })
}

const OTPValidation = (key, value) => {
  if (value == OTPGenerator(key)) return true
  return false
}

module.exports = { OTPGenerator, OTPValidation }
