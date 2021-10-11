const server = require('./api/server')
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})