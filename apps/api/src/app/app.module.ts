import { Module } from '@nestjs/common';
import { ApiSharedFrameworkConfigModule } from '@voclearn/api/shared/framework/config';
import { ApiSharedFrameworkDatabaseModule } from '@voclearn/api/shared/framework/database';
import { ApiVocabularyModule } from '@voclearn/api/vocabulary';

@Module({
  imports: [
    ApiSharedFrameworkConfigModule,
    ApiSharedFrameworkDatabaseModule,
    ApiVocabularyModule,
  ],
})
export class AppModule {}
