import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordEntity } from './word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordGroupService } from '../word-group/word-group.service';
import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { AssociationEntity } from '../association/association.entity';
import { RepetitionClient } from '../repetition/repetition.client';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
    private readonly wordGroupService: WordGroupService,
    private readonly repetitionClient: RepetitionClient
  ) {}

  async create(dto: CreateWordDto, userId: UserId): Promise<void> {
    const wordGroup = await this.wordGroupService.findOne(
      new Uuid(dto.wordGroupId),
      userId
    );

    const word = new WordEntity(
      dto.id,
      dto.value,
      dto.translation,
      wordGroup,
      userId
    );

    const association = new AssociationEntity(
      dto.associationId,
      dto.associationNote,
      word
    );

    word.association = association;

    await this.wordRepository.manager.transaction(async (entityManager) => {
      await entityManager.save(association);
      await entityManager.save(word);

      await this.repetitionClient.addCard(new Uuid(word.id), userId);
    });
  }

  async findOne(id: Uuid, userId: UserId): Promise<WordEntity> {
    const word = await this.wordRepository.findOneOrFail(id.value);

    WordService.assertUserIsAuthorized(word, userId);

    return word;
  }

  async update(id: Uuid, dto: UpdateWordDto, userId: UserId): Promise<void> {
    const word = await this.findOne(id, userId);

    if (dto.value !== undefined) {
      word.value = dto.value;
    }
    if (dto.wordGroupId !== undefined) {
      word.wordGroup = await this.wordGroupService.findOne(
        new Uuid(dto.wordGroupId),
        userId
      );
    }

    await this.wordRepository.save(word);
  }

  async remove(id: Uuid, userId: UserId): Promise<void> {
    const word = await this.findOne(id, userId);

    await this.wordRepository.remove(word);
  }

  async checkWordTranslation(
    wordId: Uuid,
    translation: string,
    userId: UserId
  ): Promise<boolean> {
    const word = await this.findOne(wordId, userId);

    const wordTranslation = word.translation;

    return wordTranslation === translation;
  }

  private static assertUserIsAuthorized(
    word: WordEntity,
    userId: UserId
  ): void {
    if (word.userId !== userId) {
      throw new Error(`User ${userId} does not have access to word ${word.id}`);
    }
  }
}
