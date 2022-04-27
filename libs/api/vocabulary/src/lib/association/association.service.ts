import { Injectable, Logger } from '@nestjs/common';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Repository } from 'typeorm';
import { AssociationEntity } from './association.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserId, Uuid } from '@voclearn/api/shared/domain';

@Injectable()
export class AssociationService {
  private readonly logger = new Logger(AssociationService.name);

  constructor(
    @InjectRepository(AssociationEntity)
    private readonly associationRepository: Repository<AssociationEntity>
  ) {}

  async update(
    id: Uuid,
    dto: UpdateAssociationDto,
    userId: UserId
  ): Promise<void> {
    const association = await this.findOne(id, userId);

    if (dto.note !== undefined) {
      association.note = dto.note;
    }

    await this.associationRepository.save(association);

    this.logger.debug(`Association ${id.value} updated by user ${userId}`);
  }

  private async findOne(id: Uuid, userId: UserId): Promise<AssociationEntity> {
    const association = await this.associationRepository.findOneOrFail(
      id.value,
      { relations: ['word'] }
    );

    AssociationService.assertUserIsAuthorized(association, userId);

    return association;
  }

  private static assertUserIsAuthorized(
    association: AssociationEntity,
    userId: UserId
  ): void {
    if (association.word.userId !== userId) {
      throw new Error(
        `User ${userId} does not have access to association ${association.id}`
      );
    }
  }
}
