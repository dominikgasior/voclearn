import {
  CardId,
  Learner,
  LearnerId,
  LearningSession,
  Partition,
  Repetition,
} from '@voclearn/api-repetition-domain';
import { Transaction } from '@voclearn/api/shared/application';

export abstract class LearnerRepository {
  abstract get(
    learnerId: LearnerId,
    transaction: Transaction
  ): Promise<Learner>;

  abstract save(learner: Learner, transaction: Transaction): Promise<void>;

  abstract getRepetition(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: Transaction
  ): Promise<Repetition>;

  abstract saveRepetition(
    repetition: Repetition,
    transaction: Transaction
  ): Promise<void>;

  abstract hasCard(cardId: CardId, transaction: Transaction): Promise<boolean>;

  abstract addCardToPartition(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: Transaction
  ): Promise<void>;

  abstract fillPartition(
    session: LearningSession,
    learnerId: LearnerId,
    transaction: Transaction
  ): Promise<Partition>;

  abstract removeCardFromPartition(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: Transaction
  ): Promise<void>;

  abstract reset(learnerId: LearnerId, transaction: Transaction): Promise<void>;
}
