import {
  Controller,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { VoclearnAuthShellsociationService } from './association.service';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { AuthenticatedUser, AuthUser } from '@voclearn/api/shared/rest-api';
import { Uuid } from '@voclearn/api/shared/domain';

@Controller('association')
export class VoclearnAuthShellsociationController {
  constructor(
    private readonly associationService: VoclearnAuthShellsociationService
  ) {}

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAssociationDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.associationService.update(new Uuid(id), dto, user.id);
  }
}
