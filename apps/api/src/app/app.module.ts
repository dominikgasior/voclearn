import { Module } from '@nestjs/common';
import { ApiSharedFrameworkConfigModule } from '@voclearn/api/shared/framework/config';
import { ApiSharedFrameworkDatabaseModule } from '@voclearn/api/shared/framework/database';

@Module({
  imports: [ApiSharedFrameworkConfigModule, ApiSharedFrameworkDatabaseModule],
})
export class AppModule {}
