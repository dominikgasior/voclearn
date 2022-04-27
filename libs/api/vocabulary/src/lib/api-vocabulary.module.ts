import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WordController } from './word/word.controller';
import { WordService } from './word/word.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './word/word.entity';
import {
  ApiSharedRestApiModule,
  AuthMiddleware,
  RefreshTokenAuthMiddleware,
} from '@voclearn/api/shared/rest-api';
import { WordGroupController } from './word-group/word-group.controller';
import { WordGroupService } from './word-group/word-group.service';
import { WordGroupEntity } from './word-group/word-group.entity';
import { AssociationController } from './association/association.controller';
import { AssociationService } from './association/association.service';
import { AssociationEntity } from './association/association.entity';
import { WordGroupRepository } from './word-group/word-group.repository';
import { ApiSharedInfrastructureDatabaseModule } from '@voclearn/api/shared/infrastructure/database';
import { RepetitionClient } from './repetition/repetition.client';
import { ApiRepetitionModule } from '@voclearn/api-repetition-shell';
import { VocabularyFacade } from './api/vocabulary.facade';
import { WordMapper } from './word/word.mapper';
import { AssociationMapper } from './association/association.mapper';

@Module({
  imports: [
    ApiSharedInfrastructureDatabaseModule,
    TypeOrmModule.forFeature([
      WordEntity,
      WordGroupEntity,
      WordGroupRepository,
      AssociationEntity,
    ]),
    ApiSharedRestApiModule,
    ApiRepetitionModule,
  ],
  providers: [
    WordService,
    WordGroupService,
    AssociationService,
    RepetitionClient,
    VocabularyFacade,
    WordMapper,
    AssociationMapper,
  ],
  controllers: [WordController, WordGroupController, AssociationController],
  exports: [VocabularyFacade],
})
export class ApiVocabularyModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RefreshTokenAuthMiddleware, AuthMiddleware)
      .forRoutes(WordController, WordGroupController, AssociationController);
  }
}
