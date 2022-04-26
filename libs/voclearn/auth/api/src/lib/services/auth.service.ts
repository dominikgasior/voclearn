import { Injectable } from '@angular/core';
import { Email } from '../dtos/email';
import { Password } from '../dtos/password';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { FullName } from '../dtos/full-name';
import {
  LoginRequestContract,
  RegisterRequestContract,
} from '@voclearn/contracts';
import { AuthLocalStorage } from './auth.local-storage';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authLocalStorage: AuthLocalStorage
  ) {}

  authenticate(email: Email, password: Password): Observable<void> {
    const body: LoginRequestContract = {
      email: email.toString(),
      password: password.toString(),
    };

    return this.httpClient.post<void>('/api/auth/login', body).pipe(
      tap(() => {
        this.authLocalStorage.setAuthenticated();
      }),
      catchError((error) => {
        console.error(error);
        return of(error);
      })
    );
  }

  isAuthenticated(): boolean {
    return this.authLocalStorage.hasAuthenticated();
  }

  register(
    email: Email,
    password: Password,
    fullName: FullName
  ): Observable<void> {
    const body: RegisterRequestContract = {
      email: email.toString(),
      password: password.toString(),
      firstName: fullName.getFirstName(),
      lastName: fullName.getLastName(),
    };

    return this.httpClient.post<void>('/api/auth/register', body).pipe(
      catchError((error) => {
        console.error(error);
        return of(error);
      })
    );
  }
}
