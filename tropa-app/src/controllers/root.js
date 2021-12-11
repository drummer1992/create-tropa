import { Body, Get, Param, Post, Prefix, Query } from 'tropa'

@Prefix('/')
class Root {
  @Get('/')
  hello() {
    return { Hello: 'World' }
  }

  @Post('/{dynamicParam}')
  echo(@Body() body, @Query() query, @Param() params) {
    return { body, query, params }
  }
}
