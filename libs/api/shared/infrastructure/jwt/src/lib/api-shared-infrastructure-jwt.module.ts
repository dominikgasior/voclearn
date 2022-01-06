import { Module } from '@nestjs/common';
import { JwtTokenDecoder } from './jwt-token.decoder';
import { ApiSharedInfrastructureFirebaseModule } from '@voclearn/api/shared/infrastructure/firebase';
import { JwtTokenValidator } from './jwt-token.validator';

@Module({
  imports: [ApiSharedInfrastructureFirebaseModule],
  providers: [JwtTokenDecoder, JwtTokenValidator],
  exports: [JwtTokenDecoder, JwtTokenValidator],
})
export class ApiSharedInfrastructureJwtModule {}
