import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameColumnToPlan1718635497894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE workout_plans ADD COLUMN name VARCHAR(100)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE workout_plans DROP COLUMN name`);
  }
}
