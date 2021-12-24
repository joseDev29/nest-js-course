import { Global, Module } from '@nestjs/common'

//Global decorator hace que el modulo declarado sea global
//por lo tanto todos sus providers pueden ser usados todos los modulos
//sin necesidad de ser importado
@Global()
@Module({
  providers: [
    {
      provide: 'DB_KEY',
      useValue: 'db-12345',
    },
  ],
  exports: ['DB_KEY'],
})
export class DatabaseModule {}
