const jwt = require("jsonwebtoken")
const secret = process.env.SECRET

const JWTGenerate = (email) => {
  return jwt.sign({ email }, secret, {
    expiresIn: "7d",
  })
}

const JWTVerify = (token) => {
  try {
    const payload = jwt.verify(token, secret)
    return payload.email
  } catch (e) {
    return null
  }
}

module.exports = { JWTGenerate, JWTVerify }
