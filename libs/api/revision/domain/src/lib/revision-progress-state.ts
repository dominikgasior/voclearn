import { UserId, Uuid } from '@voclearn/api/shared/domain';

export class RevisionProgressState {
  constructor(
    readonly wordId: Uuid,
    readonly userId: UserId,
    readonly points: number
  ) {}
}
