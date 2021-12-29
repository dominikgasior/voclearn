import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedJwtToken } from '@voclearn/api/shared/infrastructure/jwt';

export interface AuthenticatedUser {
  id: string;
}

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();

    const authUser: DecodedJwtToken = request.authUser;

    if (authUser === undefined) {
      throw new Error(
        'Request does not have authUser property. Use AuthGuard to validate the request first.'
      );
    }

    return {
      id: authUser.sub,
    };
  }
);
