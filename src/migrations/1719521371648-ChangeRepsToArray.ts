import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeRepsToArray1719521371648 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the old `reps` column
    await queryRunner.dropColumn('workout_exercise_details', 'reps');

    // Add the new `reps` column as an array
    await queryRunner.addColumn(
      'workout_exercise_details',
      new TableColumn({
        name: 'reps',
        type: 'int',
        isArray: true,
        default: 'ARRAY[]::integer[]',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the new `reps` column
    await queryRunner.dropColumn('workout_exercise_details', 'reps');

    // Add the old `reps` column back as an integer
    await queryRunner.addColumn(
      'workout_exercise_details',
      new TableColumn({
        name: 'reps',
        type: 'int',
      }),
    );
  }
}
