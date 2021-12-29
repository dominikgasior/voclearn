import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateWordGroupDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;
}
