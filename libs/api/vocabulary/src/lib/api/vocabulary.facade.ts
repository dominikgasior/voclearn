import { Injectable } from '@nestjs/common';
import { WordService } from '../word/word.service';
import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { Word } from './dto/word';

@Injectable()
export class VocabularyFacade {
  constructor(private readonly wordService: WordService) {}

  async getWord(wordId: Uuid, userId: UserId): Promise<Word> {
    const wordEntity = await this.wordService.findOne(wordId, userId);

    return new Word(wordEntity.id, wordEntity.value);
  }

  checkWordTranslation(
    wordId: Uuid,
    translation: string,
    userId: UserId
  ): Promise<boolean> {
    return this.wordService.checkWordTranslation(wordId, translation, userId);
  }
}
