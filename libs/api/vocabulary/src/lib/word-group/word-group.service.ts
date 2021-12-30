import { Injectable } from '@nestjs/common';
import { CreateWordGroupDto } from './dto/create-word-group.dto';
import { UpdateWordGroupDto } from './dto/update-word-group.dto';
import { Repository } from 'typeorm';
import { WordGroupEntity } from './word-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';

@Injectable()
export class WordGroupService {
  constructor(
    @InjectRepository(WordGroupEntity)
    private readonly repository: Repository<WordGroupEntity>
  ) {}

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
