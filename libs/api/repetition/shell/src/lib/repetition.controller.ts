import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  AddCardCommand,
  RepeatSuccessfullyCommand,
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
        new Uuid('b7c23d13-5077-42b7-a5bd-42792d03cb8f'),
        'jahsdjkahsday7'
      )
    );
  }
}
