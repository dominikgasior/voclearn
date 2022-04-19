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
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { AuthenticatedUser, AuthUser } from '@voclearn/api/shared/rest-api';
import { Uuid } from '@voclearn/api/shared/domain';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateWordDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordService.create(dto, user.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWordDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordService.update(new Uuid(id), dto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id') id: string,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.wordService.remove(new Uuid(id), user.id);
  }
}
