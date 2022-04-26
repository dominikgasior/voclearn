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
import { VoclearnAuthShellsociationController } from './association/association.controller';
import { VoclearnAuthShellsociationService } from './association/association.service';
import { VoclearnAuthShellsociationEntity } from './association/association.entity';
import { WordGroupRepository } from './word-group/word-group.repository';
import { ApiSharedInfrastructureDatabaseModule } from '@voclearn/api/shared/infrastructure/database';
import { RepetitionClient } from './repetition/repetition.client';
import { ApiRepetitionModule } from '@voclearn/api-repetition-shell';
import { VocabularyFacade } from './api/vocabulary.facade';

@Module({
  imports: [
    ApiSharedInfrastructureDatabaseModule,
    TypeOrmModule.forFeature([
      WordEntity,
      WordGroupEntity,
      WordGroupRepository,
      VoclearnAuthShellsociationEntity,
    ]),
    ApiSharedRestApiModule,
    ApiRepetitionModule,
  ],
  providers: [
    WordService,
    WordGroupService,
    VoclearnAuthShellsociationService,
    RepetitionClient,
    VocabularyFacade,
  ],
  controllers: [
    WordController,
    WordGroupController,
    VoclearnAuthShellsociationController,
  ],
  exports: [VocabularyFacade],
})
export class ApiVocabularyModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RefreshTokenAuthMiddleware, AuthMiddleware)
      .forRoutes(
        WordController,
        WordGroupController,
        VoclearnAuthShellsociationController
      );
  }
}
