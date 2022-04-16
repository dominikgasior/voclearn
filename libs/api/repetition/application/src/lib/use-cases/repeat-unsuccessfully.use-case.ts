import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RepeatUnsuccessfullyCommand } from '../boundaries/commands/repeat-unsuccessfully.command';
import { Transactional } from '@voclearn/api/shared/application';
import { LearnerRepository } from '../gateways/learner.repository';

@CommandHandler(RepeatUnsuccessfullyCommand)
export class RepeatUnsuccessfullyUseCase
  implements ICommandHandler<RepeatUnsuccessfullyCommand, void>
{
  constructor(
    private readonly transactional: Transactional,
    private readonly learnerRepository: LearnerRepository
  ) {}

  async execute(command: RepeatUnsuccessfullyCommand): Promise<void> {
    await this.transactional.execute(async (transaction) => {
      const repetition = await this.learnerRepository.getRepetition(
        command.cardId,
        command.learnerId,
        transaction
      );

      const successfulRepetition = repetition.repeatUnsuccessfully();

      await this.learnerRepository.saveRepetition(
        successfulRepetition,
        transaction
      );
    });
  }
}
