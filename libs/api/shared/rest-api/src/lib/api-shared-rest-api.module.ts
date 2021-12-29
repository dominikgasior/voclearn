import { Module } from '@nestjs/common';
import { ApiSharedInfrastructureJwtModule } from '@voclearn/api/shared/infrastructure/jwt';

@Module({
  imports: [ApiSharedInfrastructureJwtModule],
  controllers: [],
  providers: [],
  exports: [ApiSharedInfrastructureJwtModule],
})
export class ApiSharedRestApiModule {}
