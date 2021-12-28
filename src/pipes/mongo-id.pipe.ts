import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
//import { isMongoId } from 'class-validator'
import { ObjectId } from 'mongodb'

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!ObjectId.isValid(value))
      throw new BadRequestException(`The id ${value} is not a MongoId valid`)

    //Otra forma
    // if (!isMongoId(value))
    //   throw new BadRequestException(`Product id '${value}' no valid`)

    return value
  }
}
