import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HttpModule, HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import * as Joi from 'joi'

import { environments } from './environments'
import { ProductsModule } from './modules/products/products.module'
import { UsersModule } from './modules/users/users.module'
import { DatabaseModule } from './modules/database/database.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config'

const API_KEY_PROD = 'prod-123456'
const API_KEY_DEV = 'dev-123456'

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      //Declaramor el arvhico env que queremos leer
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      //Definimos que el modulo sea global, por lo tanto
      //ConfigService podra ser usado en cualquier modulo sin ser importado
      isGlobal: true,
      //Cargamos la configuracion del archivo config.ts
      load: [config],
      //Validamos con Joi los tipos y la obligatoriedad
      //de las variables de entorno cargadas de los .envs
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
    //useValue permite utilizar el patron de inyeccion de dependencias
    //con un valor en lugar de una clase
    //Al injectar un servicio se desacopla en un objeto con estos parametros
    //pero en lugar de utilizar useValue utiliza useClass
    {
      provide: 'API_KEY',
      useValue:
        process.env.NODE_ENV === 'production' ? API_KEY_PROD : API_KEY_DEV,
    },
    //usefactory permite generar un provider con operaciones asincronas
    //al cual se le pueden injectar dependencias mediante la propiedad inject
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        //firstValueFrom permite convertir el observable que retorna la peticion get
        //a una promise
        //Llamada a API externa solo de ejemplo
        //No se recomienda hacer peticiones a APIs externas desde un useFactory
        //ya que el inicio del servico en el que se inyecte, dependera de la respuesta de la API
        const tasks = await firstValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos'),
        )

        return tasks.data
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
