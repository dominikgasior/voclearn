import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RepeatSuccessfullyCommand } from '../boundaries/commands/repeat-successfully.command';
import { Transactional } from '@voclearn/api/shared/application';
import { LearnerRepository } from '../gateways/learner.repository';

@CommandHandler(RepeatSuccessfullyCommand)
export class RepeatSuccessfullyUseCase
  implements ICommandHandler<RepeatSuccessfullyCommand, void>
{
  constructor(
    private readonly transactional: Transactional,
    private readonly learnerRepository: LearnerRepository
  ) {}

  async execute(command: RepeatSuccessfullyCommand): Promise<void> {
    await this.transactional.execute(async (transaction) => {
      const repetition = await this.learnerRepository.getRepetition(
        command.cardId,
        command.learnerId,
        transaction
      );

      const successfulRepetition = repetition.repeatSuccessfully();

      await this.learnerRepository.saveRepetition(
        successfulRepetition,
        transaction
      );
    });
  }
}
