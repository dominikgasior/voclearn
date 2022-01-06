import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedJwtToken } from '@voclearn/api/shared/infrastructure/jwt';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();

    const authUser: DecodedJwtToken = request.authUser;

    if (authUser === undefined) {
      throw new Error(
        'Request does not have authUser property. AuthMiddleware might not have been set up.'
      );
    }

    return {
      id: authUser.sub,
    };
  }
);
