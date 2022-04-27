import { Injectable } from '@nestjs/common';
import { Word } from './dto/word';
import { WordEntity } from './word.entity';
import { AssociationMapper } from '../association/association.mapper';

@Injectable()
export class WordMapper {
  constructor(private readonly associationMapper: AssociationMapper) {}

  map(entity: WordEntity): Word {
    const association = this.associationMapper.map(entity.association);

    return new Word(entity.id, entity.value, entity.translation, association);
  }

  mapMany(entities: WordEntity[]): Word[] {
    return entities.map((entity) => this.map(entity));
  }
}
