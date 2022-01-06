import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  attachAuthCookiesToResponse,
  idTokenCookieKey,
  isAuthenticatedCookieKey,
  refreshTokenCookieKey,
} from '@voclearn/api/shared/rest-api';
import { AuthService } from './auth.service';
import { Email } from './dto/email';
import { FullName } from './dto/full-name';
import { Password } from './dto/password';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() requestBody: RegisterDto): Promise<void> {
    return this.authService.register(
      new Email(requestBody.email),
      new FullName(requestBody.firstName, requestBody.lastName),
      new Password(requestBody.password)
    );
  }

  @Post('/login')
  @HttpCode(HttpStatus.NO_CONTENT)
  async login(
    @Body() requestBody: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    const authenticatedUser = await this.authService.login(
      new Email(requestBody.email),
      new Password(requestBody.password)
    );

    attachAuthCookiesToResponse(
      {
        [idTokenCookieKey]: authenticatedUser.idToken.value,
        [refreshTokenCookieKey]: authenticatedUser.refreshToken,
        [isAuthenticatedCookieKey]: '1',
      },
      response
    );
  }
}
