import { Controller, Get, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
import config from './config/config'

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('config')
  getConfig() {
    return this.configService
  }
}
