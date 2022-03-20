import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TrackProgressCommand } from '../boundaries/request-models/commands/track-progress.command';
import { RevisionProgressRepository } from '../gateways/revision-progress.repository';
import { RevisionProgress } from '@voclearn/api/revision/domain';

@CommandHandler(TrackProgressCommand)
export class TrackProgressUseCase
  implements ICommandHandler<TrackProgressCommand, void>
{
  constructor(private readonly repository: RevisionProgressRepository) {}

  async execute(command: TrackProgressCommand): Promise<void> {
    const revisionProgress = RevisionProgress.track(
      command.wordId,
      command.userId
    );

    await this.repository.save(revisionProgress);
  }
}
