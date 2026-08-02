const logger = require('./logger')
const requestLogger = (request, response, next) => {
  logger.info('Method', request.method)
  logger.info('Path', request.Path)
  logger.info('Body', request.body)
  logger.info('------------')
  next()
}
const unknownEndpoit = (request, response) => {
  response.status(404).send({ error: 'unknownEndpoit' })
}

module.exports = {
  requestLogger,
}
