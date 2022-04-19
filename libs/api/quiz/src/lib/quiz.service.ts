import { Injectable } from '@nestjs/common';
import { RepetitionClient } from './repetition/repetition.client';
import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { Question } from './dto/question';
import { VocabularyClient } from './vocabulary/vocabulary.client';
import { AnswerQuestionDto } from './dto/answer-question.dto';

@Injectable()
export class QuizService {
  constructor(
    private readonly repetitionClient: RepetitionClient,
    private readonly vocabularyClient: VocabularyClient
  ) {}

  async getNextQuestion(userId: UserId): Promise<Question> {
    const questionId = await this.repetitionClient.getNextQuestionId(userId);

    return this.vocabularyClient.getQuestion(questionId, userId);
  }

  async answerQuestion(dto: AnswerQuestionDto, userId: UserId): Promise<void> {
    const questionId = new Uuid(dto.questionId);

    const isAnswerCorrect = await this.vocabularyClient.checkAnswer(
      questionId,
      dto.answer,
      userId
    );

    if (isAnswerCorrect) {
      return this.repetitionClient.answerQuestionSuccessfully(
        questionId,
        userId
      );
    }

    return this.repetitionClient.answerQuestionUnsuccessfully(
      questionId,
      userId
    );
  }
}
