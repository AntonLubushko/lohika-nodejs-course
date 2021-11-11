import { createServer, IncomingMessage, ServerResponse } from "http"
import winston from "winston"

import { APP_PORT, ENV } from "./config"

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({ level: 'info' }),
  ],
});

createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "GET") {
    let params: String
    req
      .on("data", (data) => {
      })
      .on("end", () => {
        logger.info({ method: req.method, url: req.url })
        res.end("I gave you everything I had")
      })
  }
  if (req.method === "POST") {
    const chunks: Buffer[] = []
    let body: Record<string, unknown> | null = null
    req
      .on("data", (data) => {
        chunks.push(data)
      })
      .on("end", () => {
        const rawBody = Buffer.concat(chunks).toString()
        body = JSON.parse(rawBody)
        logger.info({ method: req.method, url: req.url, body: body })

        res.end(rawBody)
      })
  }
}).listen(APP_PORT, () => logger.info({ msg: `Server is listening on ${APP_PORT} ` + 'ENV is  ' + `${ENV}` }))

process.on('uncaughtException', (err, origin) => {
  logger.error({ uncaught: origin })
})
process.on('unhandledRejection', (reason, promise) => {
  logger.error({ unhandled: reason })
})