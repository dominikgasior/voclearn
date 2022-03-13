import { Module } from '@nestjs/common';
import { ApiSharedInfrastructureJwtModule } from '@voclearn/api/shared/infrastructure/jwt';
import { ApiSharedInfrastructureFirebaseModule } from '@voclearn/api/shared/infrastructure/firebase';

@Module({
  imports: [
    ApiSharedInfrastructureJwtModule,
    ApiSharedInfrastructureFirebaseModule,
  ],
  exports: [
    ApiSharedInfrastructureJwtModule,
    ApiSharedInfrastructureFirebaseModule,
  ],
})
export class ApiSharedRestApiModule {}
