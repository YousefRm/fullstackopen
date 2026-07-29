const logger = require('./logger')
const requestLogger = (request, response, next) => {
  logger.info('Method')
  logger.info('Path')
  logger.info('Body')
  logger.info('------------')
  next()
}
const unknownEndpoit = (request, response) => {
  response.status(404).send({ error: 'unknownEndpoit' })
}

module.exports = {
  requestLogger,
}
