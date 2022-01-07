import {
  Controller,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AssociationService } from './association.service';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { AuthUser } from '@voclearn/api/shared/rest-api';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';

@Controller('association')
export class AssociationController {
  constructor(private readonly service: AssociationService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAssociationDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.service.update(id, dto, user);
  }
}
