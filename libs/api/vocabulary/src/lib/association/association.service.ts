import { Injectable } from '@nestjs/common';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Repository } from 'typeorm';
import { AssociationEntity } from './association.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WordService } from '../word/word.service';

@Injectable()
export class AssociationService {
  constructor(
    @InjectRepository(AssociationEntity)
    private readonly repository: Repository<AssociationEntity>,
    private readonly wordService: WordService
  ) {}

  async create(dto: CreateAssociationDto): Promise<void> {
    const word = await this.wordService.findOne(dto.wordId);

    const association = new AssociationEntity(dto.id, dto.note, word);

    await this.repository.save(association);
  }

  findOne(id: string): Promise<AssociationEntity> {
    return this.repository.findOneOrFail(id);
  }

  async update(id: string, dto: UpdateAssociationDto): Promise<void> {
    const association = await this.findOne(id);

    if (dto.note !== undefined) {
      association.note = dto.note;
    }

    await this.repository.save(association);
  }

  async remove(id: string): Promise<void> {
    const association = await this.findOne(id);

    await this.repository.remove(association);
  }
}
