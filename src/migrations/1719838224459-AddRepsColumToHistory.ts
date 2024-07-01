import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRepsColumToHistory1719838224459 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'workout_history',
      new TableColumn({
        name: 'reps',
        type: 'int',
        isArray: true,
        isNullable: false,
        default: 'ARRAY[]::INTEGER[]', // Default value of empty array
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('workout_history', 'reps');
  }
}
