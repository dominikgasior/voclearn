export interface DecodedJwtToken {
  sub: string;
}

export abstract class JwtTokenDecoder<T = DecodedJwtToken> {
  abstract decode(token: string): Promise<T>;
}
