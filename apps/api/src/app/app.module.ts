import { Module } from '@nestjs/common';
import { ApiVocabularyModule } from '@voclearn/api/vocabulary';
import { AppConfigModule } from './config/app-config.module';
import { AppDatabaseModule } from './database/app-database.module';
import { ApiAuthModule } from '@voclearn/api/auth';
import { ApiQuizModule } from '@voclearn/api/quiz';

@Module({
  imports: [
    AppConfigModule,
    AppDatabaseModule,
    ApiAuthModule,
    ApiVocabularyModule,
    ApiQuizModule,
  ],
})
export class AppModule {}
