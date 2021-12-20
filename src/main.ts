import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      //Eliminara del request body todos los atributos que no esten definidos en el DTO
      whitelist: true,
      //Retorna un error si se envian atributos no definidos en el DTO
      forbidNonWhitelisted: true,
    }),
  )
  await app.listen(3000)
}
bootstrap()
