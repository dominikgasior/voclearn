import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AssociationService } from './association.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { AuthGuard, AuthUser } from '@voclearn/api/shared/rest-api';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';
import { AssociationEntity } from './association.entity';

@Controller('association')
@UseGuards(AuthGuard)
export class AssociationController {
  constructor(private readonly service: AssociationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateAssociationDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.service.create(dto, user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id') id: string,
    @AuthUser() user: AuthenticatedUser
  ): Promise<AssociationEntity> {
    return this.service.findOne(id, user);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAssociationDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.service.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id') id: string,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.service.remove(id, user);
  }
}
