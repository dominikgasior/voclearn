import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WordGroupService } from './word-group.service';
import { CreateWordGroupDto } from './dto/create-word-group.dto';
import { UpdateWordGroupDto } from './dto/update-word-group.dto';
import { AuthenticatedUser, AuthUser } from '@voclearn/api/shared/rest-api';
import { Uuid } from '@voclearn/api/shared/domain';

@Controller('word-group')
export class WordGroupController {
  constructor(private readonly wordGroupService: WordGroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateWordGroupDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordGroupService.create(dto, user.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWordGroupDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordGroupService.update(new Uuid(id), dto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id') id: string,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordGroupService.remove(new Uuid(id), user.id);
  }
}
