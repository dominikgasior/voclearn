import { Injectable } from '@angular/core';
import { Email } from '../dtos/email';
import { Password } from '../dtos/password';
import { HttpClient } from '@angular/common/http';
import { AuthStorage } from './auth.storage';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { FullName } from '../dtos/full-name';
import {
  LoginRequestContract,
  RegisterRequestContract,
} from '@voclearn/contracts';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authStorage: AuthStorage,
    private readonly router: Router
  ) {}

  authenticate(email: Email, password: Password): void {
    const body: LoginRequestContract = {
      email: email.toString(),
      password: password.toString(),
    };

    this.httpClient
      .post<void>('/api/auth/login', body)
      .pipe(
        tap(() => {
          this.authStorage.setAuthenticated();
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          console.error(error);
          return of(error);
        })
      )
      .subscribe();
  }

  register(email: Email, password: Password, fullName: FullName): void {
    const body: RegisterRequestContract = {
      email: email.toString(),
      password: password.toString(),
      firstName: fullName.getFirstName(),
      lastName: fullName.getLastName(),
    };

    this.httpClient
      .post<void>('/api/auth/register', body)
      .pipe(
        tap(() => {
          this.router.navigate(['/auth/login']);
        }),
        catchError((error) => {
          console.error(error);
          return of(error);
        })
      )
      .subscribe();
  }
}
