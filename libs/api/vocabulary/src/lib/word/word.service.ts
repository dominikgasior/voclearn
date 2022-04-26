import { Injectable, Logger } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordEntity } from './word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordGroupService } from '../word-group/word-group.service';
import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { VoclearnAuthShellsociationEntity } from '../association/association.entity';
import { RepetitionClient } from '../repetition/repetition.client';

@Injectable()
export class WordService {
  private readonly logger = new Logger(WordService.name);

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

    const association = new VoclearnAuthShellsociationEntity(
      dto.associationId,
      dto.associationNote,
      word
    );

    word.association = association;

    await this.wordRepository.manager.transaction(async (entityManager) => {
      await entityManager.save(association);
      await entityManager.save(word);

      await this.repetitionClient.addWord(new Uuid(word.id), userId);
    });

    this.logger.debug(`Word ${dto.id} created by user ${userId}`);
  }

  async findOne(id: Uuid, userId: UserId): Promise<WordEntity> {
    const word = await this.wordRepository.findOneOrFail(id.value, {
      relations: ['association'],
    });

    WordService.assertUserIsAuthorized(word, userId);

    return word;
  }

  async update(id: Uuid, dto: UpdateWordDto, userId: UserId): Promise<void> {
    const word = await this.findOne(id, userId);

    if (dto.value !== undefined) {
      word.value = dto.value;
    }
    if (dto.translation !== undefined) {
      word.translation = dto.translation;
    }

    await this.wordRepository.save(word);

    this.logger.debug(`Word ${id.value} updated by user ${userId}`);
  }

  async remove(id: Uuid, userId: UserId): Promise<void> {
    const word = await this.findOne(id, userId);
    console.log(word);

    await this.wordRepository.manager.transaction(async (entityManager) => {
      await entityManager.remove(word);
      await entityManager.remove(word.association);

      await this.repetitionClient.removeWord(id, userId);
    });

    this.logger.debug(`Word ${id.value} removed by user ${userId}`);
  }

  async checkWordTranslation(
    wordId: Uuid,
    translation: string,
    userId: UserId
  ): Promise<boolean> {
    const word = await this.findOne(wordId, userId);

    const wordTranslation = word.translation;

    const result = wordTranslation === translation;

    this.logger.debug(
      `Translation ${translation} for word ${wordId.value} checked by user ${userId}, result = ${result}`
    );

    return result;
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
