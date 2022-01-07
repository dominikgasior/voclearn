import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateWordGroupDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name!: string;
}
