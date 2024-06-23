import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTypeInWorkOutTable1718477661429
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the existing 'type' column
    await queryRunner.query(`
        ALTER TABLE workouts
        DROP COLUMN IF EXISTS type;
    `);

    // Add new 'type' column with boolean type and default value false
    await queryRunner.query(`
        ALTER TABLE workouts
        ADD COLUMN type boolean DEFAULT false;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the new 'type' column
    await queryRunner.query(`
        ALTER TABLE workouts
        DROP COLUMN type;
    `);
  }
}
