import { Injectable } from '@nestjs/common';
import { FirebaseAdmin } from '@voclearn/api/shared/infrastructure/firebase';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import { JwtTokenDecoder } from './jwt-token.decoder';

@Injectable()
export class FirebaseJwtTokenDecoder
  implements JwtTokenDecoder<DecodedIdToken>
{
  constructor(private readonly firebaseAdmin: FirebaseAdmin) {}

  decode(token: string): Promise<DecodedIdToken> {
    return this.firebaseAdmin.auth().verifyIdToken(token);
  }
}
