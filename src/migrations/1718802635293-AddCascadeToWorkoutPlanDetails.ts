import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeToWorkoutPlanDetails1718802635293
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the existing foreign key constraint
    await queryRunner.query(`
          ALTER TABLE "workout_plan_details" DROP CONSTRAINT "FK_169ac07b22fce2874fc43d8ba99"
        `);

    // Add a new foreign key constraint with CASCADE on delete and update
    await queryRunner.query(`
          ALTER TABLE "workout_plan_details" 
          ADD CONSTRAINT "FK_169ac07b22fce2874fc43d8ba99"
          FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plans"("id") 
          ON DELETE CASCADE 
          ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraint with CASCADE
    await queryRunner.query(`
          ALTER TABLE "workout_plan_details" DROP CONSTRAINT "FK_169ac07b22fce2874fc43d8ba99"
        `);

    // Restore the original foreign key constraint without CASCADE
    await queryRunner.query(`
          ALTER TABLE "workout_plan_details"
          ADD CONSTRAINT "FK_169ac07b22fce2874fc43d8ba99"
          FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plans"("id")
        `);
  }
}
