import { Module } from '@nestjs/common';
import { ApiSharedInfrastructureDatabaseModule } from '@voclearn/api/shared/infrastructure/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearnerEntity } from './learner-repository/learner.entity';
import { CardEntity } from './learner-repository/card.entity';
import { LearnerMapper } from './learner-repository/learner.mapper';
import { CardMapper } from './learner-repository/card.mapper';
import { PartitionEntity } from './learner-repository/partition.entity';
import { ApiSharedInfrastructureTransactionalModule } from '@voclearn/api/shared/infrastructure/transactional';
import { ApiSharedInfrastructureDomainEventPublisherModule } from '@voclearn/api/shared/infrastructure/domain-event-publisher';
import {
  GetCardToRepeatDataProvider,
  LearnerRepository,
} from '@voclearn/api-repetition-application';
import { TypeormLearnerRepository } from './learner-repository/typeorm-learner.repository';
import { TypeormGetCardToRepeatDataProvider } from './get-card-to-repeat-data-provider/typeorm-get-card-to-repeat.data-provider';

@Module({
  imports: [
    ApiSharedInfrastructureDatabaseModule,
    TypeOrmModule.forFeature([LearnerEntity, CardEntity, PartitionEntity]),
    ApiSharedInfrastructureTransactionalModule,
    ApiSharedInfrastructureDomainEventPublisherModule,
  ],
  providers: [
    {
      provide: LearnerRepository,
      useClass: TypeormLearnerRepository,
    },
    {
      provide: GetCardToRepeatDataProvider,
      useClass: TypeormGetCardToRepeatDataProvider,
    },
    LearnerMapper,
    CardMapper,
  ],
  exports: [
    LearnerRepository,
    GetCardToRepeatDataProvider,
    ApiSharedInfrastructureTransactionalModule,
    ApiSharedInfrastructureDomainEventPublisherModule,
  ],
})
export class ApiRepetitionInfrastructureModule {}
