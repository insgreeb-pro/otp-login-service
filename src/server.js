const Express = require("express")
const authMiddleware = require("./middleware/auth")
const logMiddleware = require("./middleware/log")
const meRouter = require("./router/me")
const otpRouter = require("./router/otp")

const server = Express()

server.use(Express.json())
server.use(logMiddleware)

server.use("/otp", otpRouter)
server.use("/me", authMiddleware, meRouter)

server.get("*", async (_, res) => {
  res.status(404).json({
    error: true,
    message: "Not Found!",
  })
})

module.exports = server
