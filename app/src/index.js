import * as tropa from 'tropa'
import * as http from 'http'
import * as path from 'path'

const PORT = process.env.PORT || 3000

async function bootstrap() {
  await tropa.loadControllers(path.resolve(__dirname, './controllers'))

  const server = http.createServer(tropa.listener)

  server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

bootstrap().catch(e => {
  console.error(e.stack)

  process.exit(-1)
})
