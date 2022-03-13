import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from '@voclearn/api/shared/domain';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from './quiz.entity';
import { Repository } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly repository: Repository<QuizEntity>
  ) {}

  async create(dto: CreateQuizDto, user: AuthenticatedUser): Promise<void> {
    const quiz = new QuizEntity(dto.id, [], user.id);

    quiz.questions = this.mapQuestions(dto, quiz);

    await this.repository.save(quiz);
  }

  private mapQuestions(dto: CreateQuizDto, quiz: QuizEntity): QuestionEntity[] {
    return dto.questions.map(
      (questionDto) =>
        new QuestionEntity(
          questionDto.id,
          questionDto.question,
          questionDto.answer,
          quiz
        )
    );
  }
}
