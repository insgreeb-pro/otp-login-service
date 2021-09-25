const Express = require("express")
const logMiddleware = require("./middleware/log")
const DB = require("./utils/db")

const server = Express()

server.use(Express.json())
server.use(logMiddleware)

server.get("*", async (_, res) => {
  res.status(404).json({
    error: true,
    message: "Not Found!",
  })
})

module.exports = server
