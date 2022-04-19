import { Injectable } from '@nestjs/common';
import { CreateWordGroupDto } from './dto/create-word-group.dto';
import { UpdateWordGroupDto } from './dto/update-word-group.dto';
import { WordGroupEntity } from './word-group.entity';
import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { WordGroupRepository } from './word-group.repository';

@Injectable()
export class WordGroupService {
  constructor(private readonly wordGroupRepository: WordGroupRepository) {}

  async create(dto: CreateWordGroupDto, userId: UserId): Promise<void> {
    const wordGroup = new WordGroupEntity(dto.id, dto.name, [], userId);

    await this.wordGroupRepository.save(wordGroup);
  }

  async findOne(id: Uuid, userId: UserId): Promise<WordGroupEntity> {
    const wordGroup = await this.wordGroupRepository.findOneOrFail(id.value);

    WordGroupService.assertUserIsAuthorized(wordGroup, userId);

    return wordGroup;
  }

  async update(
    id: Uuid,
    dto: UpdateWordGroupDto,
    userId: UserId
  ): Promise<void> {
    const wordGroup = await this.findOne(id, userId);

    if (dto.name !== undefined) {
      wordGroup.name = dto.name;
    }

    await this.wordGroupRepository.save(wordGroup);
  }

  async remove(id: Uuid, userId: UserId): Promise<void> {
    const wordGroup = await this.findOne(id, userId);

    const numberOfWordsInWordGroup = await this.wordGroupRepository.countWords(
      wordGroup.id
    );

    if (numberOfWordsInWordGroup > 0) {
      throw new Error('Word group must be empty to be removed');
    }

    await this.wordGroupRepository.remove(wordGroup);
  }

  private static assertUserIsAuthorized(
    wordGroup: WordGroupEntity,
    userId: UserId
  ): void {
    if (wordGroup.userId !== userId) {
      throw new Error(
        `User ${userId} does not have access to word group ${wordGroup.id}`
      );
    }
  }
}
