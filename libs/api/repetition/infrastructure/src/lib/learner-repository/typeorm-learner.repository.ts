import { LearnerRepository } from '@voclearn/api-repetition-application';
import { Injectable } from '@nestjs/common';
import {
  CardId,
  CurrentDeckCard,
  Learner,
  LearnerId,
  LearningSession,
  Partition,
  Repetition,
} from '@voclearn/api-repetition-domain';
import { Brackets, QueryRunner, Repository } from 'typeorm';
import { LearnerEntity } from './learner.entity';
import { PartitionEntity } from './partition.entity';
import { LearnerMapper } from './learner.mapper';
import { CardEntity } from './card.entity';
import { CardMapper } from './card.mapper';
import { DomainEventPublisher } from '@voclearn/api/shared/infrastructure/domain-event-publisher';

@Injectable()
export class TypeormLearnerRepository implements LearnerRepository {
  constructor(
    private readonly learnerMapper: LearnerMapper,
    private readonly cardMapper: CardMapper,
    private readonly domainEventPublisher: DomainEventPublisher
  ) {}

  async getRepetition(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<Repetition> {
    const learnerEntity = await this.learnerRepository(
      transaction
    ).findOneOrFail(learnerId);
    const cardEntity = await this.cardRepository(transaction).findOneOrFail(
      cardId.value
    );

    await this.assertCardIsPartOfPartition(
      cardEntity,
      learnerEntity,
      transaction
    );

    const learner = this.learnerMapper.map(learnerEntity);
    const card = this.cardMapper.map(cardEntity);

    return new Repetition(learner, card);
  }

  async hasCard(cardId: CardId, transaction: QueryRunner): Promise<boolean> {
    const cardEntity = await this.cardRepository(transaction).findOne(
      cardId.value
    );

    return cardEntity !== undefined;
  }

  async save(learner: Learner, transaction: QueryRunner): Promise<void> {
    const learnerEntity = this.learnerMapper.mapToEntity(learner);

    await this.learnerRepository(transaction).save(learnerEntity);

    await this.domainEventPublisher.publishAll(
      learner.getUncommittedEvents(),
      transaction
    );
  }

  async saveRepetition(
    repetition: Repetition,
    transaction: QueryRunner
  ): Promise<void> {
    const repetitionSnapshot = repetition.getSnapshot();

    const learner = repetitionSnapshot.learner;
    const card = repetitionSnapshot.card;

    const learnerEntity = this.learnerMapper.mapToEntity(learner);
    const cardEntity = this.cardMapper.mapToEntity(card, learnerEntity);

    await this.learnerRepository(transaction).save(learnerEntity);
    await this.cardRepository(transaction).save(cardEntity);

    await this.domainEventPublisher.publishAll(
      learner.getUncommittedEvents(),
      transaction
    );
  }

  async get(learnerId: LearnerId, transaction: QueryRunner): Promise<Learner> {
    const learnerEntity = await this.learnerRepository(transaction).findOne(
      learnerId
    );

    if (learnerEntity === undefined) {
      return new Learner(learnerId, LearningSession.start(), Partition.empty());
    }

    return this.learnerMapper.map(learnerEntity);
  }

  async addCardToPartition(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<void> {
    const cardEntity = this.cardRepository(transaction).create({
      id: cardId.value,
    });

    const learnerEntity = this.learnerRepository(transaction).create({
      id: learnerId,
    });

    const partitionEntity = new PartitionEntity(cardEntity, learnerEntity);

    await this.partitionRepository(transaction).insert(partitionEntity);
  }

  async fillPartition(
    session: LearningSession,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<Partition> {
    const [query, params] = this.cardRepository(transaction)
      .createQueryBuilder('card')
      .select('card.id, card.learnerId')
      .where('card.learnerId = :learnerId', { learnerId: learnerId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('card.type = :type', { type: CurrentDeckCard.name });
          qb.orWhere(':sessionNumber = ANY(card.sessionDeckNumbers)', {
            sessionNumber: session.toNumber(),
          });
        })
      )
      .getQueryAndParameters();

    const insertResult = await this.partitionRepository(transaction).query(
      `INSERT INTO partitions ("cardId", "learnerId") ${query} RETURNING id`,
      params
    );

    return new Partition(insertResult.length);
  }

  async removeCardFromPartition(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<void> {
    const cardEntity = this.cardRepository(transaction).create({
      id: cardId.value,
    });

    const learnerEntity = this.learnerRepository(transaction).create({
      id: learnerId,
    });

    await this.partitionRepository(transaction).delete({
      card: cardEntity,
      learner: learnerEntity,
    });
  }

  async reset(learnerId: LearnerId, transaction: QueryRunner): Promise<void> {
    const learnerEntity = this.learnerRepository(transaction).create({
      id: learnerId,
    });

    await this.cardRepository(transaction).update(
      { learner: learnerEntity },
      { type: CurrentDeckCard.name, sessionDeckNumbers: undefined }
    );

    await this.partitionRepository(transaction).delete({
      learner: learnerEntity,
    });

    const partition = await this.fillPartition(
      LearningSession.start(),
      learnerId,
      transaction
    );

    await this.learnerRepository(transaction).update(learnerId, {
      currentSession: LearningSession.start().toNumber(),
      partitionSize: partition.getSize(),
    });
  }

  private async assertCardIsPartOfPartition(
    cardEntity: CardEntity,
    learnerEntity: LearnerEntity,
    transaction: QueryRunner
  ): Promise<void> {
    try {
      await this.partitionRepository(transaction).findOneOrFail({
        where: {
          card: cardEntity,
          learner: learnerEntity,
        },
      });
    } catch (e) {
      throw new Error(
        `Card ${cardEntity.id} is not a part of the partition of learner ${learnerEntity.id}`
      );
    }
  }

  private learnerRepository(
    transaction: QueryRunner
  ): Repository<LearnerEntity> {
    return transaction.manager.getRepository(LearnerEntity);
  }

  private cardRepository(transaction: QueryRunner): Repository<CardEntity> {
    return transaction.manager.getRepository(CardEntity);
  }

  private partitionRepository(
    transaction: QueryRunner
  ): Repository<PartitionEntity> {
    return transaction.manager.getRepository(PartitionEntity);
  }
}
