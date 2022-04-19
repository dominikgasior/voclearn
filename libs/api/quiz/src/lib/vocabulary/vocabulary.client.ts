import { Injectable } from '@nestjs/common';
import { VocabularyFacade } from '@voclearn/api/vocabulary';
import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { Question } from '../dto/question';

@Injectable()
export class VocabularyClient {
  constructor(private readonly vocabularyFacade: VocabularyFacade) {}

  async getQuestion(questionId: Uuid, userId: UserId): Promise<Question> {
    const word = await this.vocabularyFacade.getWord(questionId, userId);

    return new Question(word.id, word.value);
  }

  checkAnswer(
    questionId: Uuid,
    answer: string,
    userId: UserId
  ): Promise<boolean> {
    return this.vocabularyFacade.checkWordTranslation(
      questionId,
      answer,
      userId
    );
  }
}
