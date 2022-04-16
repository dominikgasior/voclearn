import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { SessionDeckCard } from '@voclearn/api-repetition-domain';
import { LearnerEntity } from './learner.entity';

@Entity('cards')
export class CardEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  type: string;

  @ManyToOne(() => LearnerEntity)
  learner: LearnerEntity;

  @Column({ type: 'int', array: true, nullable: true })
  sessionDeckNumbers: number[] | null;

  constructor(
    id: string,
    type: string,
    learner: LearnerEntity,
    sessionDeckNumbers: number[] | null
  ) {
    this.id = id;
    this.type = type;
    this.learner = learner;
    this.sessionDeckNumbers = sessionDeckNumbers;

    this.assertSessionDeckNumberArePassedIfCardTypeIsSessionDeckCard();
  }

  private assertSessionDeckNumberArePassedIfCardTypeIsSessionDeckCard(): void {
    if (
      this.type === SessionDeckCard.name &&
      this.sessionDeckNumbers === undefined
    ) {
      throw new Error(
        `Session deck numbers must be passed if card type is ${SessionDeckCard.name}`
      );
    }
  }
}
