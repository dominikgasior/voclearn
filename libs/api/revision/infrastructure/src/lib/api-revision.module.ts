import { Module } from '@nestjs/common';
import { ApiRevisionApplicationModule } from '@voclearn/api/revision/application';
import { ApiRevisionInfrastructureModule } from './api-revision-infrastructure.module';

@Module({
  imports: [
    ApiRevisionApplicationModule.withInfrastructure([
      ApiRevisionInfrastructureModule,
    ]),
  ],
  exports: [ApiRevisionApplicationModule],
})
export class ApiRevisionModule {}
