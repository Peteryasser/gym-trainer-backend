import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddsetsColumnToworkoutDetails1718575193392
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "workout_exercise_details"
                ADD COLUMN "weights" float array DEFAULT '{}'
              `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "workout_exercise_details"
                DROP COLUMN "weights"
              `);
  }
}
