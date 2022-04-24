import { Injectable } from '@angular/core';
import { Email } from '../dtos/email';
import { Password } from '../dtos/password';
import { HttpClient } from '@angular/common/http';
import { AuthStorage } from './auth.storage';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authStorage: AuthStorage,
    private readonly router: Router
  ) {}

  authenticate(email: Email, password: Password): void {
    this.httpClient
      .post<void>('http://localhost:3333/api/auth/login', {
        email: email.toString(),
        password: password.toString(),
      })
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
}
