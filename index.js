const server = require("./src/server")

require("dotenv").config()

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`Server run on port ${port}`)
})
