import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validator';

@Module({
  imports: [ConfigModule.forRoot({ validate, ignoreEnvFile: true })],
  exports: [ConfigModule],
})
export class ApiSharedFrameworkConfigModule {}
