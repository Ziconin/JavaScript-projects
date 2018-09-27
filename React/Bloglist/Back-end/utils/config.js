if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = process.env.PORT
let dbUrl = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  dbUrl = process.env.TEST_MONGODB_URI
}

module.exports = {
  dbUrl,
  port
}
