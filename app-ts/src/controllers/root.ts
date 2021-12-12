import {Body, Get, Param, Post, Prefix, Query, Request, Response, Context} from 'tropa'
import {TropaRequest, TropaResponse, TropaContext} from 'tropa/types'

@Prefix('/')
export default class Root {
  @Get('/')
  hello() {
    return {Hello: 'World'}
  }

  @Post('/{dynamicParam}')
  echo(
    @Body() body: any,
    @Query() query: object,
    @Param() params: object,
    @Request() req: TropaRequest,
    @Response() res: TropaResponse,
    @Context() ctx: TropaContext,
  ) {
    return {body, query, params}
  }
}
