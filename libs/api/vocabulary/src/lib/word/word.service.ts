import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordEntity } from './word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordGroupService } from '../word-group/word-group.service';
import { AuthenticatedUser, Uuid } from '@voclearn/api/shared/domain';
import { AssociationEntity } from '../association/association.entity';
import { RepetitionClient } from '../repetition.client';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly repository: Repository<WordEntity>,
    private readonly wordGroupService: WordGroupService,
    private readonly repetitionClient: RepetitionClient
  ) {}

  async create(dto: CreateWordDto, user: AuthenticatedUser): Promise<void> {
    const wordGroup = await this.wordGroupService.findOne(
      dto.wordGroupId,
      user
    );

    const word = new WordEntity(
      dto.id,
      dto.value,
      dto.translation,
      wordGroup,
      user.id
    );

    const association = new AssociationEntity(
      dto.associationId,
      dto.associationNote,
      word
    );

    word.association = association;

    await this.repository.manager.transaction(async (entityManager) => {
      await entityManager.save(association);
      await entityManager.save(word);

      await this.repetitionClient.addCard(new Uuid(word.id), user.id);
    });
  }

  async findOne(id: string, user: AuthenticatedUser): Promise<WordEntity> {
    const word = await this.repository.findOneOrFail(id);

    WordService.assertUserIsAuthorized(word, user);

    return word;
  }

  async update(
    id: string,
    dto: UpdateWordDto,
    user: AuthenticatedUser
  ): Promise<void> {
    const word = await this.findOne(id, user);

    if (dto.value !== undefined) {
      word.value = dto.value;
    }
    if (dto.wordGroupId !== undefined) {
      word.wordGroup = await this.wordGroupService.findOne(
        dto.wordGroupId,
        user
      );
    }

    await this.repository.save(word);
  }

  async remove(id: string, user: AuthenticatedUser): Promise<void> {
    const word = await this.findOne(id, user);

    await this.repository.remove(word);
  }

  private static assertUserIsAuthorized(
    word: WordEntity,
    user: AuthenticatedUser
  ): void {
    if (word.userId !== user.id) {
      throw new Error(
        `User ${user.id} does not have access to word ${word.id}`
      );
    }
  }
}
