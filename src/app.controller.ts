import { Controller, Get, Inject, SetMetadata, UseGuards } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
import config from './config/config'
import { Public } from './modules/auth/decorators/public.decorator'
import { ApiKeyGuard } from './modules/auth/guards/api-key.guard'

@UseGuards(ApiKeyGuard)
@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Get()
  //@SetMetadata('isPublic', true)
  //Decorador personalizado
  @Public()
  getHello(): string {
    return this.appService.getHello()
  }

  // @UseGuards(ApiKeyGuard)
  @Get('config')
  getConfig() {
    return this.configService
  }
}
