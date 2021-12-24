import { Controller, Get, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
import config from './config'

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('DB_KEY') private dbKey: string,
    //Permite injectar las configuraciones de la forma en la que se configuro en el archivo config
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('api-key')
  getApiKey(): string {
    return this.appService.getApiKey()
  }

  @Get('tasks')
  getTasks(): any[] {
    return this.appService.getTasks()
  }

  @Get('db-key')
  getDBKey(): string {
    return this.dbKey
  }

  @Get('config')
  getConfig() {
    return this.configService
  }
}
