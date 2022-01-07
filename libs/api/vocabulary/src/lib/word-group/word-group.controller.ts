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
import { AuthUser } from '@voclearn/api/shared/rest-api';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';

@Controller('word-group')
export class WordGroupController {
  constructor(private readonly service: WordGroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateWordGroupDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.service.create(dto, user);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWordGroupDto,
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
