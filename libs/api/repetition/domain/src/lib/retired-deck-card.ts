import { Card } from './card';
import { CardId } from './card-id';
import { CurrentDeckCard } from './current-deck-card';
import { LearningSession } from './learning-session';

export class RetiredDeckCard extends Card {
  static move(cardId: CardId): RetiredDeckCard {
    return new RetiredDeckCard(cardId);
  }

  reviewSuccessfully(session: LearningSession): Card {
    return this.stay();
  }

  reviewUnsuccessfully(session: LearningSession): CurrentDeckCard {
    return CurrentDeckCard.moveBack(this.id);
  }
}
