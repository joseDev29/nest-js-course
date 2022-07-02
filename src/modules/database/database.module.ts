import { Global, Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Db, MongoClient } from 'mongodb'

import config from 'src/config/config'

@Global()
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   user: 'root',
    //   pass: 'root',
    //   dbName: 'store-api',
    // }),

    //forRootAsync permite inicializar el module asincronamente
    //lo cual nos permite definir un useFactory el cual retorna el objeto de configuracion
    //y injectar dependencias
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongoDB

        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        }
      },
      inject: [config.KEY],
    }),
  ],
  //Segunda forma
  providers: [
    {
      provide: 'MongoDBService',
      useFactory: async (
        configService: ConfigType<typeof config>,
      ): Promise<Db> => {
        const { connection, user, password, host, port, dbName } =
          configService.mongoDB

        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`

        const client = new MongoClient(uri)
        await client.connect()

        const database = client.db(dbName)

        console.log('Mongo DB successfully connect with MongoClient')

        return database
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MongoDBService', MongooseModule],
})
export class DatabaseModule {}
