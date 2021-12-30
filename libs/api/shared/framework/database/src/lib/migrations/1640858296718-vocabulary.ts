import { MigrationInterface, QueryRunner } from 'typeorm';

export class vocabulary1640858296718 implements MigrationInterface {
  name = 'vocabulary1640858296718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "word_groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_da382e77af600564e9d9ae3b916" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "words" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying(255) NOT NULL, "wordGroupId" uuid NOT NULL, CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "associations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "note" character varying(255) NOT NULL, "wordId" uuid NOT NULL, CONSTRAINT "PK_409f7d0389b44b03f8b0767ce0c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "words" ADD CONSTRAINT "FK_8ce6b2f70a7cf7d2de6dabef0c7" FOREIGN KEY ("wordGroupId") REFERENCES "word_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "associations" ADD CONSTRAINT "FK_e0dec05c28593685665731e5464" FOREIGN KEY ("wordId") REFERENCES "words"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "associations" DROP CONSTRAINT "FK_e0dec05c28593685665731e5464"`
    );
    await queryRunner.query(
      `ALTER TABLE "words" DROP CONSTRAINT "FK_8ce6b2f70a7cf7d2de6dabef0c7"`
    );
    await queryRunner.query(`DROP TABLE "associations"`);
    await queryRunner.query(`DROP TABLE "words"`);
    await queryRunner.query(`DROP TABLE "word_groups"`);
  }
}
