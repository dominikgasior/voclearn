import { Injectable } from '@nestjs/common';
import { decode } from 'jsonwebtoken';

export interface DecodedJwtToken {
  sub: string;
  exp: Date;
}

@Injectable()
export class JwtTokenDecoder {
  decode(token: string): DecodedJwtToken {
    const decodedIdToken = decode(token);

    if (decodedIdToken === null || typeof decodedIdToken === 'string') {
      throw new Error('Decoding token failed');
    }

    if (decodedIdToken.sub === undefined) {
      throw new Error('Cannot decode jwt token due to lack of sub property');
    }

    if (decodedIdToken.exp === undefined) {
      throw new Error('Cannot decode jwt token due to lack of exp property');
    }

    return {
      sub: decodedIdToken.sub,
      exp: new Date(decodedIdToken.exp * 1000),
    };
  }
}
