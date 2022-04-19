import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Question } from './dto/question';
import { QuizService } from './quiz.service';
import { AuthenticatedUser, AuthUser } from '@voclearn/api/shared/rest-api';
import { AnswerQuestionDto } from './dto/answer-question.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly service: QuizService) {}

  @Get('question')
  @HttpCode(HttpStatus.OK)
  getNextQuestion(@AuthUser() user: AuthenticatedUser): Promise<Question> {
    return this.service.getNextQuestion(user.id);
  }

  @Post('question/answer')
  @HttpCode(HttpStatus.NO_CONTENT)
  answerQuestion(
    @Body() dto: AnswerQuestionDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.service.answerQuestion(dto, user.id);
  }
}
