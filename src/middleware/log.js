const { Router } = require("express")

const logMiddleware = Router()

logMiddleware.use((req, _, next) => {
  const now = new Date().toISOString()
  console.log(`${now} - ${req.method} - ${req.url}`)
  next()
})

module.exports = logMiddleware
