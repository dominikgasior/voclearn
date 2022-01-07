import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateWordDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  value!: string;

  @IsNotEmpty()
  @IsUUID()
  wordGroupId!: string;

  @IsNotEmpty()
  @IsUUID()
  associationId!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  associationNote!: string;
}
