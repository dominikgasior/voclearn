import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { RevisionProgressState } from './revision-progress-state';

export enum RevisionStatus {
  BARELY_KNOWN = 'barely-known',
  KNOWN = 'known',
}

export class RevisionProgress {
  private readonly wordId: Uuid;
  private readonly userId: UserId;

  private points = 0;
  private status = RevisionStatus.BARELY_KNOWN;
  private lastRevisionDate?: Date;

  private static THRESHOLD = 10;

  constructor(wordId: Uuid, userId: UserId) {
    this.wordId = wordId;
    this.userId = userId;
  }

  static track(wordId: Uuid, userId: UserId): RevisionProgress {
    return new RevisionProgress(wordId, userId);
  }

  make(revisionDate: Date): void {
    this.points += RevisionProgress.THRESHOLD;

    if (this.points >= RevisionProgress.THRESHOLD * 10) {
      this.status = RevisionStatus.KNOWN;
    }

    this.lastRevisionDate = revisionDate;
  }

  regress(revisionDate: Date): void {
    this.points -= RevisionProgress.THRESHOLD;

    if (this.points <= RevisionProgress.THRESHOLD) {
      this.status = RevisionStatus.BARELY_KNOWN;
    }

    this.lastRevisionDate = revisionDate;
  }

  getState(): RevisionProgressState {
    return new RevisionProgressState(this.wordId, this.userId, this.points);
  }
}
