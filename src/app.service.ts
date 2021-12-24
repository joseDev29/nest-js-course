import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  //Se injecta el valor definido como provider en AppModule
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    return 'Hello World!'
  }

  getApiKey(): string {
    return this.apiKey
  }

  getTasks(): any[] {
    return this.tasks
  }
}
