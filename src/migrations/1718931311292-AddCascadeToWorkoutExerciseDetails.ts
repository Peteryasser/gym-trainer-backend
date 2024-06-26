import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeToWorkoutExerciseDetails1718931311292
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the existing foreign key constraint
    await queryRunner.query(`
            ALTER TABLE "workout_exercise_details" DROP CONSTRAINT "FK_0294df8c935769bb3ede1086052"
        `);

    // Add the new foreign key constraint with ON DELETE CASCADE and ON UPDATE CASCADE
    await queryRunner.query(`
            ALTER TABLE "workout_exercise_details"
            ADD CONSTRAINT "FK_0294df8c935769bb3ede1086052"
            FOREIGN KEY ("workout_exercise_id")
            REFERENCES "workout_exercises"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraint with ON DELETE CASCADE and ON UPDATE CASCADE
    await queryRunner.query(`
            ALTER TABLE "workout_exercise_details" DROP CONSTRAINT "FK_0294df8c935769bb3ede1086052"
        `);

    // Add the original foreign key constraint back without ON DELETE CASCADE and ON UPDATE CASCADE
    await queryRunner.query(`
            ALTER TABLE "workout_exercise_details"
            ADD CONSTRAINT "FK_0294df8c935769bb3ede1086052"
            FOREIGN KEY ("workout_exercise_id")
            REFERENCES "workout_exercises"("id")
        `);
  }
}
