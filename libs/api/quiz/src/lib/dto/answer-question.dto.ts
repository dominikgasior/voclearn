import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AnswerQuestionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  answer!: string;
}
