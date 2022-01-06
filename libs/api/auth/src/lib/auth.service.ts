import { User } from './dto/user';
import { Email } from './dto/email';
import { FullName } from './dto/full-name';
import { Password } from './dto/password';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthenticatedUser } from './dto/authenticated-user';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(
    email: Email,
    fullName: FullName,
    password: Password
  ): Promise<void> {
    await this.userRepository.add(new User(email, fullName), password);
  }

  async login(email: Email, password: Password): Promise<AuthenticatedUser> {
    return this.userRepository.authenticate({ email, password });
  }
}
