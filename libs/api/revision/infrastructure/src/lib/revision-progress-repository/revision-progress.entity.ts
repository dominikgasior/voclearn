import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('revision_progresses')
export class RevisionProgressEntity {
  @PrimaryColumn({ type: 'uuid' })
  readonly wordId: string;

  @PrimaryColumn()
  readonly userId: string;

  @Column()
  points: number;

  constructor(wordId: string, userId: string, points: number) {
    this.wordId = wordId;
    this.userId = userId;
    this.points = points;
  }
}
