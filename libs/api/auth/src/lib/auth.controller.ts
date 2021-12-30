import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterRequestBody } from './request-bodies/register.request-body';
import { LoginRequestBody } from './request-bodies/login.request-body';
import { Response } from 'express';
import {
  idTokenCookieKey,
  isAuthenticatedCookieKey,
} from '@voclearn/api/shared/rest-api';
import { AuthService } from './auth.service';
import { IdToken } from './dto/id-token';
import { Email } from './dto/email';
import { FullName } from './dto/full-name';
import { Password } from './dto/password';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() requestBody: RegisterRequestBody): Promise<void> {
    return this.authService.register(
      new Email(requestBody.email),
      new FullName(requestBody.firstName, requestBody.lastName),
      new Password(requestBody.password)
    );
  }

  @Post('/login')
  @HttpCode(HttpStatus.NO_CONTENT)
  async login(
    @Body() requestBody: LoginRequestBody,
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    const idToken = await this.authService.login(
      new Email(requestBody.email),
      new Password(requestBody.password)
    );

    AuthController.addAuthCookieToResponse(response, idToken);
  }

  private static addAuthCookieToResponse(
    response: Response,
    idToken: IdToken
  ): void {
    response.cookie(idTokenCookieKey, idToken.value, {
      httpOnly: true,
    });

    response.cookie(isAuthenticatedCookieKey, 1, {
      sameSite: 'lax',
    });
  }
}
