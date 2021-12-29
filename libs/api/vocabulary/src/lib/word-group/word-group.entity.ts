import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WordEntity } from '../word/word.entity';

@Entity('word_groups')
export class WordGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => WordEntity, (word) => word.wordGroup)
  words: WordEntity[];

  constructor(id: string, name: string, words: WordEntity[]) {
    this.id = id;
    this.name = name;
    this.words = words;
  }
}
