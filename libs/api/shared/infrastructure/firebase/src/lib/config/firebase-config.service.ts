import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import firebaseConfig from './firebase.config';

@Injectable()
export class FirebaseConfigService {
  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly config: ConfigType<typeof firebaseConfig>
  ) {}

  getKey(): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.config.key!;
  }
}
