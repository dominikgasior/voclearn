import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtTokenDecoder } from '@voclearn/api/shared/infrastructure/jwt';
import { FirebaseApi } from '@voclearn/api/shared/infrastructure/firebase';
import {
  assertAllAuthCookiesAreDefinedInRequest,
  attachAuthCookiesToResponse,
  AuthCookies,
  idTokenCookieKey,
  isAuthenticatedCookieKey,
  overwriteAuthCookiesInRequest,
  refreshTokenCookieKey,
} from './auth.cookies';

@Injectable()
export class RefreshTokenAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly tokenDecoder: JwtTokenDecoder,
    private readonly firebaseApi: FirebaseApi
  ) {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    assertAllAuthCookiesAreDefinedInRequest(request, this.constructor.name);

    const idToken = request.cookies[idTokenCookieKey];

    const decodedIdToken = this.tokenDecoder.decode(idToken);

    const now = new Date();

    if (decodedIdToken.exp < now) {
      const refreshToken = request.cookies[refreshTokenCookieKey];

      const refreshTokenResponse = await this.firebaseApi.refreshToken(
        refreshToken
      );

      const newAuthCookies: AuthCookies = {
        [idTokenCookieKey]: refreshTokenResponse.id_token,
        [refreshTokenCookieKey]: refreshTokenResponse.refresh_token,
        [isAuthenticatedCookieKey]: '1',
      };

      overwriteAuthCookiesInRequest(newAuthCookies, request);
      attachAuthCookiesToResponse(newAuthCookies, response);
    }

    next();
  }
}
