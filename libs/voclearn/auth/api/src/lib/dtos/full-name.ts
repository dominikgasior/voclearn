export class FullName {
  constructor(
    private readonly firstName: string,
    private readonly lastName: string
  ) {}

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }
}
