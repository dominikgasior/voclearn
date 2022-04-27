import { Association } from '../../association/dto/association';

export class Word {
  constructor(
    readonly id: string,
    readonly value: string,
    readonly translation: string,
    readonly association: Association
  ) {}
}
