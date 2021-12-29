import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WordEntity } from '../word/word.entity';

@Entity('associations')
export class AssociationEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 255 })
  note: string;

  @ManyToOne(() => WordEntity, (word) => word.associations, { nullable: false })
  word: WordEntity;

  constructor(id: string, note: string, word: WordEntity) {
    this.id = id;
    this.note = note;
    this.word = word;
  }
}
