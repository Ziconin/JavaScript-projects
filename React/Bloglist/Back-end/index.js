const http = require('http')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const mongoose = require('mongoose')

mongoose
  .connect(config.dbUrl, {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database', config.dbUrl)
  })
  .catch(err => {
    console.log(err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.logger)
app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
