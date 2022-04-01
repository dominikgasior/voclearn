import { OnEvent } from '@nestjs/event-emitter';
import { CardAddedEvent } from '@voclearn/api-repetition-domain';
import { Injectable } from '@nestjs/common';
import { Transaction } from '@voclearn/api/shared/application';
import { LearnerRepository } from '../gateways/learner.repository';

@Injectable()
export class UpdatePartitionWhenCardAddedEventHandler {
  constructor(private readonly learnerRepository: LearnerRepository) {}

  @OnEvent(CardAddedEvent.name)
  async handle(event: CardAddedEvent, transaction: Transaction): Promise<void> {
    await this.learnerRepository.addCardToPartition(
      event.cardId,
      event.learnerId,
      transaction
    );
    console.log('UpdatePartitionWhenCardAddedEventHandler');
  }
}
