import { Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import config from './config/config'

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return 'Hello World!'
  }

  // getConfig(): ConfigType<typeof config> {
  //   return this.configService
  // }
}
