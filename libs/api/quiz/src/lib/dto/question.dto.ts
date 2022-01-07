import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class QuestionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  question!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  answer!: string;
}
