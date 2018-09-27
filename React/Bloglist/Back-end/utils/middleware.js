const logger = (req, res, next) => {
  if(process.env.NODE_ENV === 'test') {
    return next()
  }
  console.log('Method: ', req. method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)
  console.log('---')
  next()
}

const error = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

const tokenExtractor = (req, res, next) => {
  const tokenStr = req.headers.authorization
  if(tokenStr && tokenStr.toLowerCase().startsWith('bearer ')) {
    const tokenArray = tokenStr.split(' ')
    req.token = tokenArray[1]
  }
  next()
}

module.exports = {
  logger,
  error,
  tokenExtractor
}
