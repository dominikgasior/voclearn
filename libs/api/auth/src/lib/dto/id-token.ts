import { TinyTypeOf } from 'tiny-types';

const type = Symbol();

export class IdToken extends TinyTypeOf<string>() {
  private readonly type: typeof type = type;
}
