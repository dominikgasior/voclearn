import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuizEntity } from './quiz.entity';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 255 })
  readonly question: string;

  @Column({ length: 255 })
  readonly answer: string;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions, { nullable: false })
  readonly quiz: QuizEntity;

  constructor(id: string, question: string, answer: string, quiz: QuizEntity) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.quiz = quiz;
  }
}
