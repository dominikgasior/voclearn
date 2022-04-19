import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class AnswerQuestionDto {
  @IsNotEmpty()
  @IsUUID()
  questionId!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  answer!: string;
}
