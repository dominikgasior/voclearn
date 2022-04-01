import { Injectable } from '@nestjs/common';
import { LearnerRepository } from '../gateways/learner.repository';
import { OnEvent } from '@nestjs/event-emitter';
import { CardReviewedEvent } from '@voclearn/api-repetition-domain';
import { Transaction } from '@voclearn/api/shared/application';

@Injectable()
export class UpdatePartitionWhenCardReviewedEventHandler {
  constructor(private readonly learnerRepository: LearnerRepository) {}

  @OnEvent(CardReviewedEvent.name)
  async handle(
    event: CardReviewedEvent,
    transaction: Transaction
  ): Promise<void> {
    await this.learnerRepository.removeCardFromPartition(
      event.cardId,
      event.learnerId,
      transaction
    );
    console.log('UpdatePartitionWhenCardReviewedEventHandler');
  }
}
