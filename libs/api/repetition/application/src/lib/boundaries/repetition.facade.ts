import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { RepeatSuccessfullyCommand } from './commands/repeat-successfully.command';
import { AddCardCommand } from './commands/add-card.command';

@Injectable()
export class RepetitionFacade {
  constructor(private readonly commandBus: CommandBus) {}

  addCard(command: AddCardCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  repeatSuccessfully(command: RepeatSuccessfullyCommand): Promise<void> {
    return this.commandBus.execute(command);
  }
}
