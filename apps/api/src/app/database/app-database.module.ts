import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/database-config.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { vocabulary1640858296718 } from './migrations/1640858296718-vocabulary';

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
class AppDatabaseConfigModule {}

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
          migrations: [vocabulary1640858296718],
          logging: true,
        };
      },
      imports: [AppDatabaseConfigModule],
      inject: [DatabaseConfigService],
    }),
  ],
})
export class AppDatabaseModule {}
