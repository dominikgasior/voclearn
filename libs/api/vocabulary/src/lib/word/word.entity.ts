import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WordGroupEntity } from '../word-group/word-group.entity';
import { AssociationEntity } from '../association/association.entity';

@Entity('words')
export class WordEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 255 })
  value: string;

  @ManyToOne(() => WordGroupEntity, (wordGroup) => wordGroup.words, {
    nullable: false,
  })
  wordGroup: WordGroupEntity;

  @OneToMany(() => AssociationEntity, (association) => association.word)
  associations: AssociationEntity[];

  @Column()
  userId: string;

  constructor(
    id: string,
    value: string,
    wordGroup: WordGroupEntity,
    associations: AssociationEntity[],
    userId: string
  ) {
    this.id = id;
    this.value = value;
    this.wordGroup = wordGroup;
    this.associations = associations;
    this.userId = userId;
  }
}
