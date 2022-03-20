import { RevisionProgress } from '@voclearn/api/revision/domain';
import { RevisionProgressEntity } from './revision-progress.entity';
import { instanceToPlain } from 'class-transformer';
import { Injectable } from '@nestjs/common';

interface IRevisionProgress {
  wordId: RevisionProgress['wordId'];
  userId: RevisionProgress['userId'];
  points: RevisionProgress['points'];
}

@Injectable()
export class RevisionProgressMapper {
  toEntity(revisionProgress: RevisionProgress): RevisionProgressEntity {
    const revisionProgressPlain = <IRevisionProgress>(
      instanceToPlain(revisionProgress)
    );

    return new RevisionProgressEntity(
      revisionProgressPlain.wordId.value,
      revisionProgressPlain.userId,
      revisionProgressPlain.points
    );
  }
}
