import { User } from './dto/user';
import { Email } from './dto/email';
import { FullName } from './dto/full-name';
import { Password } from './dto/password';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { IdToken } from './dto/id-token';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(
    email: Email,
    fullName: FullName,
    password: Password
  ): Promise<void> {
    await this.authRepository.register(new User(email, fullName), password);
  }

  async login(email: Email, password: Password): Promise<IdToken> {
    return this.authRepository.login(email, password);
  }
}
