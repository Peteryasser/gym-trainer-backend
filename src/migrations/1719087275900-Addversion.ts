import { MigrationInterface, QueryRunner } from 'typeorm';

export class Addversion1719087275900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE exercises
              ADD COLUMN version int DEFAULT 1;
            `);
    await queryRunner.query(`
              ALTER TABLE exercises
              ALTER COLUMN version DROP NOT NULL;
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              ALTER TABLE exercises
              ALTER COLUMN version SET NOT NULL;
            `);
    await queryRunner.query(`
              ALTER TABLE exercises
              DROP COLUMN version;
            `);
  }
}
