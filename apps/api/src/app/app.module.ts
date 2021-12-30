import { Module } from '@nestjs/common';
import { ApiVocabularyModule } from '@voclearn/api/vocabulary';
import { AppConfigModule } from './config/app-config.module';
import { AppDatabaseModule } from './database/app-database.module';

@Module({
  imports: [AppConfigModule, AppDatabaseModule, ApiVocabularyModule],
})
export class AppModule {}
