export class Email {
  constructor(private readonly value: string) {}

  toString(): string {
    return this.value;
  }
}
