import { Injectable } from '@nestjs/common';
import {
  Card,
  CurrentDeckCard,
  RetiredDeckCard,
  SessionDeck,
  SessionDeckCard,
} from '@voclearn/api-repetition-domain';
import { Uuid } from '@voclearn/api/shared/domain';
import { CardEntity } from './card.entity';
import { LearnerEntity } from './learner.entity';

@Injectable()
export class CardMapper {
  map(entity: CardEntity): Card {
    const cardId = new Uuid(entity.id);

    switch (entity.type) {
      case CurrentDeckCard.name:
        return new CurrentDeckCard(cardId);
      case SessionDeckCard.name: {
        const sessionDeckNumbers = entity.sessionDeckNumbers;

        if (sessionDeckNumbers === undefined) {
          throw new Error(
            `Session deck numbers cannot be undefined for a card of type ${SessionDeckCard.name}`
          );
        }

        return new SessionDeckCard(cardId, new SessionDeck(sessionDeckNumbers));
      }
      case RetiredDeckCard.name:
        return new RetiredDeckCard(cardId);
      default:
        throw new Error(`Unhandled card entity type: ${entity.type}`);
    }
  }

  mapToEntity(card: Card, learnerEntity: LearnerEntity): CardEntity {
    const cardType = card.constructor.name;
    const cardId = card.id.value;

    if (card instanceof SessionDeckCard) {
      return new CardEntity(
        cardId,
        cardType,
        learnerEntity,
        card.getSnapshot().sessionDeck.toNumbers()
      );
    }

    return new CardEntity(cardId, cardType, learnerEntity);
  }
}
