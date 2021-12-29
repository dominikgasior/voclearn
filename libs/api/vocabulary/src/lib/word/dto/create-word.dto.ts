import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateWordDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  @IsString()
  value!: string;

  @IsOptional()
  @IsUUID()
  wordGroupId!: string;
}
