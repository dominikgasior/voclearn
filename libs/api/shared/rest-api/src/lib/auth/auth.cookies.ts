export const idTokenCookieKey = 'idToken';
export const isAuthenticatedCookieKey = 'isAuthenticated';

export interface AuthCookies {
  [idTokenCookieKey]?: string;
  [isAuthenticatedCookieKey]?: string;
}
