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
import { AuthUser } from '@voclearn/api/shared/rest-api';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';

@Controller('word')
export class WordController {
  constructor(private readonly service: WordService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateWordDto,
    @AuthUser() user: AuthenticatedUser
  ): Promise<void> {
    return this.service.create(dto, user);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWordDto,
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
