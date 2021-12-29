import { Injectable } from '@nestjs/common';
import { CreateWordGroupDto } from './dto/create-word-group.dto';
import { UpdateWordGroupDto } from './dto/update-word-group.dto';
import { Repository } from 'typeorm';
import { WordGroupEntity } from './word-group.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WordGroupService {
  constructor(
    @InjectRepository(WordGroupEntity)
    private readonly repository: Repository<WordGroupEntity>
  ) {}

  async create(dto: CreateWordGroupDto): Promise<void> {
    const wordGroup = new WordGroupEntity(dto.id, dto.name, []);

    await this.repository.save(wordGroup);
  }

  findOne(id: string): Promise<WordGroupEntity> {
    return this.repository.findOneOrFail(id);
  }

  async update(id: string, dto: UpdateWordGroupDto): Promise<void> {
    const wordGroup = await this.findOne(id);

    if (dto.name !== undefined) {
      wordGroup.name = dto.name;
    }

    await this.repository.save(wordGroup);
  }

  async remove(id: string): Promise<void> {
    const wordGroup = await this.findOne(id);

    await this.repository.remove(wordGroup);
  }
}
