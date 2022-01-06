import { FirebaseAdmin } from '@voclearn/api/shared/infrastructure/firebase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenValidator {
  constructor(private readonly firebaseAdmin: FirebaseAdmin) {}

  async assertValid(token: string): Promise<void> {
    await this.firebaseAdmin.auth().verifyIdToken(token);
  }
}
