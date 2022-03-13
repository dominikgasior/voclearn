import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  ApiSharedRestApiModule,
  AuthMiddleware,
  RefreshTokenAuthMiddleware,
} from '@voclearn/api/shared/rest-api';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { ApiSharedInfrastructureDatabaseModule } from '@voclearn/api/shared/infrastructure/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './quiz.entity';
import { QuestionEntity } from './question.entity';

@Module({
  imports: [
    ApiSharedRestApiModule,
    ApiSharedInfrastructureDatabaseModule,
    TypeOrmModule.forFeature([QuizEntity, QuestionEntity]),
  ],
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
