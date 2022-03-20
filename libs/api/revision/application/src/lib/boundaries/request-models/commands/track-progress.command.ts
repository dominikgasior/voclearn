import { UserId, Uuid } from '@voclearn/api/shared/domain';

export class TrackProgressCommand {
  constructor(readonly wordId: Uuid, readonly userId: UserId) {}
}
