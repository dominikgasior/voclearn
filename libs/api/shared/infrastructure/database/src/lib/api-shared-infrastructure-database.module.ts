import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from './config/database-config.module';
import { getConfigToken } from '@voclearn/api/shared/infrastructure/config';
import { DatabaseConfigProvider } from './config/database.config-provider';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: DatabaseConfig) => {
        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.name,
          autoLoadEntities: true,
          migrationsRun: true,
          migrations: [],
          logging: true,
        };
      },
      imports: [DatabaseConfigModule],
      inject: [getConfigToken(DatabaseConfigProvider)],
    }),
  ],
})
export class ApiSharedInfrastructureDatabaseModule {}
