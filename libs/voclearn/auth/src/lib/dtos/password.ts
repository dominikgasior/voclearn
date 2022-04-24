export class Password {
  constructor(private readonly value: string) {}

  toString(): string {
    return this.value;
  }
}
