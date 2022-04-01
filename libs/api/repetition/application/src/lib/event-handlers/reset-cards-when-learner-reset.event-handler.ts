import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LearnerResetEvent } from '@voclearn/api-repetition-domain';
import { Transaction } from '@voclearn/api/shared/application';
import { LearnerRepository } from '../gateways/learner.repository';

@Injectable()
export class ResetCardsWhenLearnerResetEventHandler {
  constructor(private readonly learnerRepository: LearnerRepository) {}

  @OnEvent(LearnerResetEvent.name)
  async handle(
    event: LearnerResetEvent,
    transaction: Transaction
  ): Promise<void> {
    console.log('ResetCardsWhenLearnerResetEventHandler');
    await this.learnerRepository.reset(event.learnerId, transaction);
  }
}
