import { Module } from '@nestjs/common';
import { ApiVocabularyModule } from '@voclearn/api/vocabulary';
import { ApiAuthModule } from '@voclearn/api/auth';
import { ApiQuizModule } from '@voclearn/api/quiz';
import { ApiRepetitionModule } from '@voclearn/api-repetition-shell';

@Module({
  imports: [
    ApiAuthModule,
    ApiVocabularyModule,
    ApiQuizModule,
    ApiRepetitionModule,
  ],
})
export class AppModule {}
