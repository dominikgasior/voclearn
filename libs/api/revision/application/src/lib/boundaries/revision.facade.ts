import { TrackProgressCommand } from './request-models/commands/track-progress.command';
import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RevisionFacade {
  constructor(private readonly commandBus: CommandBus) {}

  trackProgress(command: TrackProgressCommand): Promise<void> {
    return this.commandBus.execute(command);
  }
}
