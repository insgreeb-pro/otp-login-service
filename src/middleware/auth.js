const { Router } = require("express")
const Cookies = require("cookies")
const { JWTVerify, JWTGenerate } = require("../utils/jwt")

const authMiddleware = Router()

authMiddleware.use((req, res, next) => {
  const key = "x-auth"
  const cookies = new Cookies(req, res)

  const token1 = req.headers.authorization
  const token = cookies.get(key)
  const email = JWTVerify(token1 || token)
  if (!email)
    return res.status(402).json({ error: true, message: "Forbidden!" })
  const newToken = JWTGenerate(email)
  req.token = newToken
  req.email = email
  cookies.set(key, newToken, { httpOnly: true })
  next()
})

module.exports = authMiddleware
