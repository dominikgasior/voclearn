import { RevisionProgress } from '@voclearn/api/revision/domain';

export abstract class RevisionProgressRepository {
  abstract save(revisionProgress: RevisionProgress): Promise<void>;
}
