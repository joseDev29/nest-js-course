import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
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

  //Configuracion de swagger para autodocumentacion de la API
  //Para poder documentar los DTOs debemos agregar
  //al array del plugins de la propiedad compilerOptions en el archivo
  //nest-cli.json el valor "@nestjs/swagger"
  //y en los DTOs el PartialType debe venir de @nest/swagger y no de @nest/mapped-types
  const config = new DocumentBuilder()
    .setTitle('Nest JS Store API')
    .setDescription('Nest JS Store practice API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  //Habilita CORS
  app.enableCors()

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
