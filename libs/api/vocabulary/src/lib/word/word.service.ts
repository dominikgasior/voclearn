import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordEntity } from './word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordGroupService } from '../word-group/word-group.service';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly repository: Repository<WordEntity>,
    private readonly wordGroupService: WordGroupService
  ) {}

  async create(dto: CreateWordDto): Promise<void> {
    const wordGroup = await this.wordGroupService.findOne(dto.wordGroupId);

    const word = new WordEntity(dto.id, dto.value, wordGroup, []);

    await this.repository.save(word);
  }

  findOne(id: string): Promise<WordEntity> {
    return this.repository.findOneOrFail(id);
  }

  async update(id: string, dto: UpdateWordDto): Promise<void> {
    const word = await this.findOne(id);

    if (dto.value !== undefined) {
      word.value = dto.value;
    }
    if (dto.wordGroupId !== undefined) {
      word.wordGroup = await this.wordGroupService.findOne(dto.wordGroupId);
    }

    await this.repository.save(word);
  }

  async remove(id: string): Promise<void> {
    const word = await this.findOne(id);

    await this.repository.remove(word);
  }
}
