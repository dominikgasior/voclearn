import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('quizzes')
export class QuizEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @OneToMany(() => QuestionEntity, (question) => question.quiz, {
    cascade: ['insert'],
  })
  questions: QuestionEntity[];

  @Column()
  userId: string;

  constructor(id: string, questions: QuestionEntity[], userId: string) {
    this.id = id;
    this.questions = questions;
    this.userId = userId;
  }
}
