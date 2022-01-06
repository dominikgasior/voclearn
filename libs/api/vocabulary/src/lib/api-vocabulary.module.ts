import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WordController } from './word/word.controller';
import { WordService } from './word/word.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './word/word.entity';
import {
  ApiSharedRestApiModule,
  AuthMiddleware,
} from '@voclearn/api/shared/rest-api';
import { WordGroupController } from './word-group/word-group.controller';
import { WordGroupService } from './word-group/word-group.service';
import { WordGroupEntity } from './word-group/word-group.entity';
import { AssociationController } from './association/association.controller';
import { AssociationService } from './association/association.service';
import { AssociationEntity } from './association/association.entity';
import { WordGroupRepository } from './word-group/word-group.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WordEntity,
      WordGroupEntity,
      WordGroupRepository,
      AssociationEntity,
    ]),
    ApiSharedRestApiModule,
  ],
  controllers: [WordController, WordGroupController, AssociationController],
  providers: [WordService, WordGroupService, AssociationService],
})
export class ApiVocabularyModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(WordController, WordGroupController, AssociationController);
  }
}
