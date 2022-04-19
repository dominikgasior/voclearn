import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  ApiSharedRestApiModule,
  AuthMiddleware,
  RefreshTokenAuthMiddleware,
} from '@voclearn/api/shared/rest-api';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { ApiRepetitionModule } from '@voclearn/api-repetition-shell';
import { RepetitionClient } from './repetition/repetition.client';
import { VocabularyClient } from './vocabulary/vocabulary.client';
import { ApiVocabularyModule } from '@voclearn/api/vocabulary';

@Module({
  imports: [ApiSharedRestApiModule, ApiRepetitionModule, ApiVocabularyModule],
  providers: [QuizService, RepetitionClient, VocabularyClient],
  controllers: [QuizController],
})
export class ApiQuizModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RefreshTokenAuthMiddleware, AuthMiddleware)
      .forRoutes(QuizController);
  }
}
