import { Get, Prefix } from 'tropa'

@Prefix('/')
export default class Root {
  @Get('/')
  hello() {
    return { Hello: 'World' }
  }
}
