import { Module } from '@nestjs/common';
import { WordController } from './word/word.controller';
import { WordService } from './word/word.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './word/word.entity';
import { ApiSharedRestApiModule } from '@voclearn/api/shared/rest-api';
import { WordGroupController } from './word-group/word-group.controller';
import { WordGroupService } from './word-group/word-group.service';
import { WordGroupEntity } from './word-group/word-group.entity';
import { AssociationController } from './association/association.controller';
import { AssociationService } from './association/association.service';
import { AssociationEntity } from './association/association.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WordEntity, WordGroupEntity, AssociationEntity]),
    ApiSharedRestApiModule,
  ],
  controllers: [WordController, WordGroupController, AssociationController],
  providers: [WordService, WordGroupService, AssociationService],
})
export class ApiVocabularyModule {}