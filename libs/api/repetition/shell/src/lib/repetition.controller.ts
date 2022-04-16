import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  AddCardCommand,
  RepeatSuccessfullyCommand,
  RepeatUnsuccessfullyCommand,
  RepetitionFacade,
} from '@voclearn/api-repetition-application';
import { Uuid } from '@voclearn/api/shared/domain';

@Controller('/repetition')
export class RepetitionController {
  constructor(private readonly facade: RepetitionFacade) {}

  @Get('add-card')
  @HttpCode(HttpStatus.NO_CONTENT)
  addCard(): Promise<void> {
    return this.facade.addCard(
      new AddCardCommand(
        new Uuid('b7c23d13-5077-42b7-a5bd-42792d03cb8f'),
        'jahsdjkahsday7'
      )
    );
  }

  @Get('repeat-successfully')
  @HttpCode(HttpStatus.NO_CONTENT)
  repeatSuccessfully(): Promise<void> {
    return this.facade.repeatSuccessfully(
      new RepeatSuccessfullyCommand(
        new Uuid('cb75c3d8-f86a-4047-8de6-6dd8bcf1ba7e'),
        'G92kWjZmJuYbQFCrNuXmeKrvASs1'
      )
    );
  }

  @Get('repeat-unsuccessfully')
  @HttpCode(HttpStatus.NO_CONTENT)
  repeatUnsuccessfully(): Promise<void> {
    return this.facade.repeatUnsuccessfully(
      new RepeatUnsuccessfullyCommand(
        new Uuid('cb75c3d8-f86a-4047-8de6-6dd8bcf1ba7e'),
        'G92kWjZmJuYbQFCrNuXmeKrvASs1'
      )
    );
  }
}
