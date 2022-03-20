import { Module } from '@nestjs/common';
import { ApiVocabularyModule } from '@voclearn/api/vocabulary';
import { ApiAuthModule } from '@voclearn/api/auth';
import { ApiQuizModule } from '@voclearn/api/quiz';
import { ApiRevisionModule } from '@voclearn/api/revision/shell';

@Module({
  imports: [
    ApiAuthModule,
    ApiVocabularyModule,
    ApiQuizModule,
    ApiRevisionModule,
  ],
})
export class AppModule {}
