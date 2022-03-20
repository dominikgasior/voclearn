import { RevisionProgressRepository } from '@voclearn/api/revision/application';
import { Injectable } from '@nestjs/common';
import { RevisionProgress } from '@voclearn/api/revision/domain';
import { Repository } from 'typeorm';
import { RevisionProgressEntity } from './revision-progress.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RevisionProgressMapper } from './revision-progress.mapper';

@Injectable()
export class TypeormRevisionProgressRepository
  implements RevisionProgressRepository
{
  constructor(
    @InjectRepository(RevisionProgressEntity)
    private readonly repository: Repository<RevisionProgressEntity>,
    private readonly mapper: RevisionProgressMapper
  ) {}

  async save(revisionProgress: RevisionProgress): Promise<void> {
    const entity = this.mapper.toEntity(revisionProgress);

    await this.repository.save(entity);
  }
}
