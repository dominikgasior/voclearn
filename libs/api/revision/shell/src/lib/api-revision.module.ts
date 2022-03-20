import { Module } from '@nestjs/common';
import { ApiRevisionApplicationModule } from '@voclearn/api/revision/application';
import { ApiRevisionInfrastructureModule } from '@voclearn/api/revision/infrastructure';

@Module({
  imports: [
    ApiRevisionApplicationModule.withInfrastructure([
      ApiRevisionInfrastructureModule,
    ]),
  ],
  exports: [ApiRevisionApplicationModule],
})
export class ApiRevisionModule {}
