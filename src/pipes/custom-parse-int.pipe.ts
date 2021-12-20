import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value) return

    const parsedValue = parseInt(value, 10)

    if (isNaN(parsedValue))
      throw new BadRequestException('Value must be a number')

    return parsedValue
  }
}
