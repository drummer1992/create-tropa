import * as tropa from 'tropa'
import * as http from 'http'
import * as path from 'path'
import cors from 'cors'
import pinoHttp from 'pino-http'

const PORT = Number(process.env.PORT || 3000)

const pino = pinoHttp({
  serializers: {
    req(req) {
      return {
        method: req.raw.method,
        url   : req.raw.url,
      }
    },
    res(res) {
      return {
        statusCode  : res.statusCode,
        responseTime: res.responseTime,
      }
    }
  },
  transport  : process.env.MODE !== 'production'
    ? { target: 'pino-pretty', options: { translateTime: true } }
    : undefined,
})

async function bootstrap() {
  await tropa.loadControllers(path.resolve(__dirname, './controllers'))

  tropa.use(cors())
  tropa.use(pino)

  const server = http.createServer(tropa.listener)

  server.listen(PORT, () => pino.logger.info(`Server started on port ${PORT}`))
}

bootstrap().catch(e => {
  pino.logger.error(e.stack)

  process.exit(-1)
})
