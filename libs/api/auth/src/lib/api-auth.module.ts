import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { ApiSharedInfrastructureFirebaseModule } from '@voclearn/api/shared/infrastructure/firebase';

@Module({
  imports: [ApiSharedInfrastructureFirebaseModule],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
})
export class ApiAuthModule {}
