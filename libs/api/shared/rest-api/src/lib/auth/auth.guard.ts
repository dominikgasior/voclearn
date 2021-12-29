import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ensure, isDefined } from 'tiny-types';
import {
  DecodedJwtToken,
  JwtTokenDecoder,
} from '@voclearn/api/shared/infrastructure/jwt';

export const idTokenCookieKey = 'idToken';
export const isAuthenticatedCookieKey = 'isAuthenticated';

export interface AuthCookies {
  [idTokenCookieKey]?: string;
  [isAuthenticatedCookieKey]?: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenDecoder: JwtTokenDecoder) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const cookies = request.cookies;

    AuthGuard.assertAllAuthCookiesAreDefined(cookies);

    const decodedIdToken = await this.validateIdToken(
      cookies[idTokenCookieKey]
    );

    AuthGuard.addDecodedIdTokenToRequest(request, decodedIdToken);

    return true;
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

  private async validateIdToken(idToken: string): Promise<DecodedJwtToken> {
    try {
      return await this.tokenDecoder.decode(idToken);
    } catch (e) {
      throw new UnauthorizedException('Invalid token given');
    }
  }

  private static addDecodedIdTokenToRequest(
    request: Record<string, unknown>,
    decodedIdToken: DecodedJwtToken
  ): void {
    request['authUser'] = decodedIdToken;
  }
}
