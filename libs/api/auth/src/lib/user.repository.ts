import {
  FirebaseAdmin,
  FirebaseApi,
} from '@voclearn/api/shared/infrastructure/firebase';
import { Injectable } from '@nestjs/common';
import { User } from './dto/user';
import { Password } from './dto/password';
import { Email } from './dto/email';
import { IdToken } from './dto/id-token';

@Injectable()
export class UserRepository {
  constructor(
    private readonly firebaseAdmin: FirebaseAdmin,
    private readonly firebaseApi: FirebaseApi
  ) {}

  async add(user: User, password: Password): Promise<void> {
    await this.firebaseAdmin.auth().createUser({
      email: user.email.value,
      emailVerified: true,
      password: password.value,
      displayName: user.name.toString(),
      disabled: false,
    });
  }

  async getIdToken(email: Email, password: Password): Promise<IdToken> {
    const response = await this.firebaseApi.signInWithEmailAndPassword(
      email.value,
      password.value
    );

    return new IdToken(response.idToken);
  }
}
