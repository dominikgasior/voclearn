import { Module } from '@nestjs/common';
import { ApiRepetitionApplicationModule } from '@voclearn/api-repetition-application';
import { ApiRepetitionInfrastructureModule } from '@voclearn/api-repetition-infrastructure';
import { RepetitionController } from './repetition.controller';

@Module({
  imports: [
    ApiRepetitionApplicationModule.withInfrastructure([
      ApiRepetitionInfrastructureModule,
    ]),
  ],
  controllers: [RepetitionController],
  exports: [ApiRepetitionApplicationModule],
})
export class ApiRepetitionModule {}
