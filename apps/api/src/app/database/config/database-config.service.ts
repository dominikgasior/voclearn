import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import databaseConfig from './database.config';

@Injectable()
export class DatabaseConfigService {
  constructor(
    @Inject(databaseConfig.KEY)
    private readonly config: ConfigType<typeof databaseConfig>
  ) {}

  getHost(): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.config.host!;
  }

  getPort(): number {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return +this.config.port!;
  }

  getUser(): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.config.user!;
  }

  getPassword(): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.config.password!;
  }

  getName(): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.config.name!;
  }
}
