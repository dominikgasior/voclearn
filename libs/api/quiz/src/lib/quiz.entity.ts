import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('quizzes')
export class QuizEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  readonly questions: QuestionEntity[];

  constructor(id: string, questions: QuestionEntity[]) {
    this.id = id;
    this.questions = questions;
  }
}
