import { Module } from '@nestjs/common';
import { ApiSharedInfrastructureDatabaseModule } from '@voclearn/api/shared/infrastructure/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevisionProgressEntity } from './revision-progress-repository/revision-progress.entity';
import { RevisionProgressRepository } from '@voclearn/api/revision/application';
import { TypeormRevisionProgressRepository } from './revision-progress-repository/typeorm-revision-progress.repository';
import { RevisionProgressMapper } from './revision-progress-repository/revision-progress.mapper';

@Module({
  imports: [
    ApiSharedInfrastructureDatabaseModule,
    TypeOrmModule.forFeature([RevisionProgressEntity]),
  ],
  providers: [
    {
      provide: RevisionProgressRepository,
      useClass: TypeormRevisionProgressRepository,
    },
    RevisionProgressMapper,
  ],
  exports: [RevisionProgressRepository],
})
export class ApiRevisionInfrastructureModule {}
