export abstract class AuthStorage {
  abstract setAuthenticated(): void;

  abstract hasAuthenticated(): boolean;
}
