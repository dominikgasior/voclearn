import { Module } from '@nestjs/common';
import { ApiSharedFrameworkConfigModule } from '@voclearn/api/shared/framework/config';

@Module({
  imports: [ApiSharedFrameworkConfigModule],
})
export class AppModule {}
