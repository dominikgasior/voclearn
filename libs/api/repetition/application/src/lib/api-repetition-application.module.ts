import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RepetitionFacade } from './boundaries/repetition.facade';
import { RepeatSuccessfullyUseCase } from './use-cases/repeat-successfully.use-case';
import { AddCardUseCase } from './use-cases/add-card.use-case';
import { UpdatePartitionWhenCardAddedEventHandler } from './event-handlers/update-partition-when-card-added.event-handler';
import { FillPartitionWhenLearnerSessionMovedEventHandler } from './event-handlers/fill-partition-when-learner-session-moved.event-handler';
import { UpdatePartitionWhenCardReviewedEventHandler } from './event-handlers/update-partition-when-card-reviewed.event-handler';
import { ResetCardsWhenLearnerResetEventHandler } from './event-handlers/reset-cards-when-learner-reset.event-handler';

@Module({
  imports: [CqrsModule],
  providers: [
    RepetitionFacade,
    RepeatSuccessfullyUseCase,
    AddCardUseCase,
    UpdatePartitionWhenCardAddedEventHandler,
    FillPartitionWhenLearnerSessionMovedEventHandler,
    UpdatePartitionWhenCardReviewedEventHandler,
    ResetCardsWhenLearnerResetEventHandler,
  ],
  exports: [RepetitionFacade],
})
export class ApiRepetitionApplicationModule {
  static withInfrastructure(
    infrastructure: ModuleMetadata['imports'] = []
  ): DynamicModule {
    return {
      module: ApiRepetitionApplicationModule,
      imports: [...infrastructure],
    };
  }
}
