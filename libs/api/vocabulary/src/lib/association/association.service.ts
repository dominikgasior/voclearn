import { Injectable } from '@nestjs/common';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Repository } from 'typeorm';
import { AssociationEntity } from './association.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';

@Injectable()
export class AssociationService {
  constructor(
    @InjectRepository(AssociationEntity)
    private readonly repository: Repository<AssociationEntity>
  ) {}

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

  private static assertUserIsAuthorized(
    association: AssociationEntity,
    user: AuthenticatedUser
  ): void {
    if (association.word.userId !== user.id) {
      throw new Error(
        `User ${user.id} does not have access to association ${association.id}`
      );
    }
  }
}
