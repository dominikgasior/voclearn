import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  async create(dto: CreateQuizDto, user: AuthenticatedUser): Promise<void> {}
}
