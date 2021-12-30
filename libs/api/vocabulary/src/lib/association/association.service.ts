import { Injectable } from '@nestjs/common';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Repository } from 'typeorm';
import { AssociationEntity } from './association.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WordService } from '../word/word.service';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';

@Injectable()
export class AssociationService {
  constructor(
    @InjectRepository(AssociationEntity)
    private readonly repository: Repository<AssociationEntity>,
    private readonly wordService: WordService
  ) {}

  async create(
    dto: CreateAssociationDto,
    user: AuthenticatedUser
  ): Promise<void> {
    const word = await this.wordService.findOne(dto.wordId, user);

    const association = new AssociationEntity(dto.id, dto.note, word, user.id);

    await this.repository.save(association);
  }

  async findOne(
    id: string,
    user: AuthenticatedUser
  ): Promise<AssociationEntity> {
    const association = await this.repository.findOneOrFail(id);

    AssociationService.assertUserIsAuthorized(association, user);

    return association;
  }

  async update(
    id: string,
    dto: UpdateAssociationDto,
    user: AuthenticatedUser
  ): Promise<void> {
    const association = await this.findOne(id, user);

    if (dto.note !== undefined) {
      association.note = dto.note;
    }

    await this.repository.save(association);
  }

  async remove(id: string, user: AuthenticatedUser): Promise<void> {
    const association = await this.findOne(id, user);

    await this.repository.remove(association);
  }

  private static assertUserIsAuthorized(
    association: AssociationEntity,
    user: AuthenticatedUser
  ): void {
    if (association.userId !== user.id) {
      throw new Error(
        `User ${user.id} does not have access to association ${association.id}`
      );
    }
  }
}
