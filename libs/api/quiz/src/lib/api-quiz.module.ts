import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  ApiSharedRestApiModule,
  AuthMiddleware,
  RefreshTokenAuthMiddleware,
} from '@voclearn/api/shared/rest-api';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [ApiSharedRestApiModule],
  providers: [QuizService],
  controllers: [QuizController],
})
export class ApiQuizModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RefreshTokenAuthMiddleware, AuthMiddleware)
      .forRoutes(QuizController);
  }
}
