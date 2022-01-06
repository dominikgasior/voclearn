import { Token } from './token';

export interface AuthenticatedUser {
  idToken: Token;
  refreshToken: string;
}
