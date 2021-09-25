const Express = require("express")
const logMiddleware = require("./middleware/log")
const otpRouter = require("./router/otp")

const server = Express()

server.use(Express.json())
server.use(logMiddleware)

server.use("/otp", otpRouter)

server.get("*", async (_, res) => {
  res.status(404).json({
    error: true,
    message: "Not Found!",
  })
})

module.exports = server
