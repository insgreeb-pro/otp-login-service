const { Router } = require("express")
const DB = require("../utils/db")

const meRouter = Router()

meRouter.get("/", async (req, res) => {
  const { email } = req
  const me = await DB.user.findUnique({ where: { email } })
  return res.json({ data: me })
})

meRouter.patch("/", async (req, res) => {
  const { email } = req
  const { name, nim } = req.body
  const update = await DB.user.update({
    where: { email },
    data: { name, nim },
  })
  res.json({ data: update })
})

module.exports = meRouter
