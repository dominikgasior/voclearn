import { Injectable } from '@nestjs/common';
import { CreateWordGroupDto } from './dto/create-word-group.dto';
import { UpdateWordGroupDto } from './dto/update-word-group.dto';
import { WordGroupEntity } from './word-group.entity';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';
import { WordGroupRepository } from './word-group.repository';

@Injectable()
export class WordGroupService {
  constructor(private readonly repository: WordGroupRepository) {}

  async create(
    dto: CreateWordGroupDto,
    user: AuthenticatedUser
  ): Promise<void> {
    const wordGroup = new WordGroupEntity(dto.id, dto.name, [], user.id);

    await this.repository.save(wordGroup);
  }

  async findOne(id: string, user: AuthenticatedUser): Promise<WordGroupEntity> {
    const wordGroup = await this.repository.findOneOrFail(id);

    WordGroupService.assertUserIsAuthorized(wordGroup, user);

    return wordGroup;
  }

  async update(
    id: string,
    dto: UpdateWordGroupDto,
    user: AuthenticatedUser
  ): Promise<void> {
    const wordGroup = await this.findOne(id, user);

    if (dto.name !== undefined) {
      wordGroup.name = dto.name;
    }

    await this.repository.save(wordGroup);
  }

  async remove(id: string, user: AuthenticatedUser): Promise<void> {
    const wordGroup = await this.findOne(id, user);

    const numberOfWordsInWordGroup = await this.repository.countWords(
      wordGroup.id
    );

    if (numberOfWordsInWordGroup > 0) {
      throw new Error('Word group must be empty to be removed');
    }

    await this.repository.remove(wordGroup);
  }

  private static assertUserIsAuthorized(
    wordGroup: WordGroupEntity,
    user: AuthenticatedUser
  ): void {
    if (wordGroup.userId !== user.id) {
      throw new Error(
        `User ${user.id} does not have access to word group ${wordGroup.id}`
      );
    }
  }
}
