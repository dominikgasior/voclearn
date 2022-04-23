import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Question } from './dto/question';
import { QuizService } from './quiz.service';
import { AuthenticatedUser, AuthUser } from '@voclearn/api/shared/rest-api';
import { AnswerQuestionDto } from './dto/answer-question.dto';
import { Uuid } from '@voclearn/api/shared/domain';

@Controller('quiz')
export class QuizController {
  constructor(private readonly service: QuizService) {}

  @Get('question')
  @HttpCode(HttpStatus.OK)
  getNextQuestion(@AuthUser() user: AuthenticatedUser): Promise<Question> {
    return this.service.getNextQuestion(user.id);
  }

  @Post('question/:id/answer')
  @HttpCode(HttpStatus.NO_CONTENT)
  answerQuestion(
    @Param('id') id: string,
    @Body() dto: AnswerQuestionDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.service.answerQuestion(new Uuid(id), dto, user.id);
  }
}
