import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class QuestionDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  question!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  answer!: string;
}
