import { PartialType } from '@nestjs/mapped-types';
import { CreateWordGroupDto } from './create-word-group.dto';

export class UpdateWordGroupDto extends PartialType(CreateWordGroupDto) {}
