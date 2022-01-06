import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();

    const authenticatedUser: AuthenticatedUser = request.authenticatedUser;

    if (authenticatedUser === undefined) {
      throw new Error(
        'Request does not have authenticatedUser property. AuthMiddleware might not have been set up properly.'
      );
    }

    return authenticatedUser;
  }
);
