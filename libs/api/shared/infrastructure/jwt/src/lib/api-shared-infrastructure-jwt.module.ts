import { Module } from '@nestjs/common';
import { JwtTokenDecoder } from './jwt-token.decoder';
import { FirebaseJwtTokenDecoder } from './firebase-jwt-token.decoder';
import { ApiSharedInfrastructureFirebaseModule } from '@voclearn/api/shared/infrastructure/firebase';

@Module({
  imports: [ApiSharedInfrastructureFirebaseModule],
  providers: [
    {
      provide: JwtTokenDecoder,
      useClass: FirebaseJwtTokenDecoder,
    },
  ],
  exports: [JwtTokenDecoder],
})
export class ApiSharedInfrastructureJwtModule {}
