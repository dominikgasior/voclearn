import {
  Injectable,
  UnauthorizedException,
  NestMiddleware,
} from '@nestjs/common';
import { ensure, isDefined } from 'tiny-types';
import {
  DecodedJwtToken,
  JwtTokenDecoder,
  JwtTokenValidator,
} from '@voclearn/api/shared/infrastructure/jwt';
import { NextFunction, Request, Response } from 'express';
import {
  AuthCookies,
  idTokenCookieKey,
  isAuthenticatedCookieKey,
} from './auth.cookies';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly tokenDecoder: JwtTokenDecoder,
    private readonly tokenValidator: JwtTokenValidator
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cookies = req.cookies;

    AuthMiddleware.assertAllAuthCookiesAreDefined(cookies);

    const idToken = cookies[idTokenCookieKey];

    const decodedIdToken = this.decodeIdToken(idToken);

    // eslint-disable-next-line no-useless-catch
    try {
      await this.assertIdTokenIsValid(idToken);
    } catch (e) {
      // TODO refresh token
      throw e;
    }

    AuthMiddleware.addDecodedIdTokenToRequest(req, decodedIdToken);

    next();
  }

  private static assertAllAuthCookiesAreDefined(cookies: AuthCookies): void {
    const idTokenCookie = cookies[idTokenCookieKey];
    const isAuthenticatedCookie = cookies[isAuthenticatedCookieKey];

    try {
      ensure(this.constructor.name, isAuthenticatedCookie, isDefined());
      ensure(this.constructor.name, idTokenCookie, isDefined());
    } catch (e) {
      throw new UnauthorizedException('Valid auth cookies not provided');
    }
  }

  private decodeIdToken(idToken: string): DecodedJwtToken {
    return this.tokenDecoder.decode(idToken);
  }

  private async assertIdTokenIsValid(idToken: string): Promise<void> {
    try {
      await this.tokenValidator.assertValid(idToken);
    } catch (e) {
      throw new UnauthorizedException('Invalid token given');
    }
  }

  private static addDecodedIdTokenToRequest(
    request: Request,
    decodedIdToken: DecodedJwtToken
  ): void {
    Object.assign(request, { authUser: decodedIdToken });
  }
}
