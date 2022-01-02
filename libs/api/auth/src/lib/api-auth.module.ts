import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { ApiSharedInfrastructureFirebaseModule } from '@voclearn/api/shared/infrastructure/firebase';

@Module({
  imports: [ApiSharedInfrastructureFirebaseModule],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class ApiAuthModule {}
