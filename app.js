const http = require('http')
const { APP_PORT, ENV } = require('./config')
const { logger } = require('./logger')

const requestHandler = (request, response) => {
  response.end('Hello World!')
}

const server = http.createServer(requestHandler)

server.listen(APP_PORT, (err) => {
  if (err) {
    return logger('something bad happened', err)
  }
  logger(`Server is listening on ${APP_PORT}`, `ENV is  `, `${ENV}`)
})