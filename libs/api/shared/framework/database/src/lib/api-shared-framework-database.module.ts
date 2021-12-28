import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/database-config.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
class ApiSharedFrameworkDatabaseConfigModule {}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: DatabaseConfigService) => {
        return {
          type: 'postgres',
          host: config.getHost(),
          port: config.getPort(),
          username: config.getUser(),
          password: config.getPassword(),
          database: config.getName(),
          autoLoadEntities: true,
          migrationsRun: true,
          migrations: [],
        };
      },
      imports: [ApiSharedFrameworkDatabaseConfigModule],
      inject: [DatabaseConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class ApiSharedFrameworkDatabaseModule {}