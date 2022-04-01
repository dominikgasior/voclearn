import { Card } from './card';
import { Learner } from './learner';
import { RepetitionSnapshot } from './snapshots';

export class Repetition {
  constructor(private readonly learner: Learner, private readonly card: Card) {}

  repeatSuccessfully(): Repetition {
    return this.learner.reviewCardSuccessfully(this.card);
  }

  getSnapshot(): RepetitionSnapshot {
    return {
      learner: this.learner,
      card: this.card,
    };
  }
}
