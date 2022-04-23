import { Injectable, Logger } from '@nestjs/common';
import { RepetitionClient } from './repetition/repetition.client';
import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { Question } from './dto/question';
import { VocabularyClient } from './vocabulary/vocabulary.client';
import { AnswerQuestionDto } from './dto/answer-question.dto';

@Injectable()
export class QuizService {
  private readonly logger = new Logger(QuizService.name);

  constructor(
    private readonly repetitionClient: RepetitionClient,
    private readonly vocabularyClient: VocabularyClient
  ) {}

  async getNextQuestion(userId: UserId): Promise<Question> {
    const questionId = await this.repetitionClient.getNextQuestionId(userId);

    const question = await this.vocabularyClient.getQuestion(
      questionId,
      userId
    );

    this.logger.debug(
      `Question ${question.question} returned for user ${userId}`
    );

    return question;
  }

  async answerQuestion(
    questionId: Uuid,
    dto: AnswerQuestionDto,
    userId: UserId
  ): Promise<void> {
    const isAnswerCorrect = await this.vocabularyClient.checkAnswer(
      questionId,
      dto.answer,
      userId
    );

    if (isAnswerCorrect) {
      await this.repetitionClient.answerQuestionSuccessfully(
        questionId,
        userId
      );

      this.logger.debug(
        `Question ${questionId.value} answered successfully by user ${userId}`
      );
    } else {
      await this.repetitionClient.answerQuestionUnsuccessfully(
        questionId,
        userId
      );

      this.logger.debug(
        `Question ${questionId.value} answered unsuccessfully by user ${userId}`
      );
    }
  }
}
