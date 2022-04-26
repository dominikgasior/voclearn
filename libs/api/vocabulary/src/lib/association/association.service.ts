import { Injectable, Logger } from '@nestjs/common';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Repository } from 'typeorm';
import { VoclearnAuthShellsociationEntity } from './association.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserId, Uuid } from '@voclearn/api/shared/domain';

@Injectable()
export class VoclearnAuthShellsociationService {
  private readonly logger = new Logger(VoclearnAuthShellsociationService.name);

  constructor(
    @InjectRepository(VoclearnAuthShellsociationEntity)
    private readonly associationRepository: Repository<VoclearnAuthShellsociationEntity>
  ) {}

  async findOne(
    id: Uuid,
    userId: UserId
  ): Promise<VoclearnAuthShellsociationEntity> {
    const association = await this.associationRepository.findOneOrFail(
      id.value,
      { relations: ['word'] }
    );

    VoclearnAuthShellsociationService.assertUserIsAuthorized(
      association,
      userId
    );

    return association;
  }

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

    this.logger.debug(
      `VoclearnAuthShellsociation ${id.value} updated by user ${userId}`
    );
  }

  private static assertUserIsAuthorized(
    association: VoclearnAuthShellsociationEntity,
    userId: UserId
  ): void {
    if (association.word.userId !== userId) {
      throw new Error(
        `User ${userId} does not have access to association ${association.id}`
      );
    }
  }
}
