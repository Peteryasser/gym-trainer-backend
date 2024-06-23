import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class ChangeHistoryTable1718614036096 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Rename the table
    await queryRunner.renameTable('user_exercise_history', 'workout_history');

    // Add new columns
    await queryRunner.addColumns('workout_history', [
      new TableColumn({
        name: 'numberOfSets',
        type: 'int',
      }),
      new TableColumn({
        name: 'weights',
        type: 'int',
        isArray: true,
      }),
    ]);

    // Drop the old foreign key and column for exercise_id
    const table = await queryRunner.getTable('workout_history');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('exercise_id') !== -1,
    );
    await queryRunner.dropForeignKey('workout_history', foreignKey);
    await queryRunner.dropColumn('workout_history', 'exercise_id');

    // Add new foreign key and column for workout_id
    await queryRunner.addColumn(
      'workout_history',
      new TableColumn({
        name: 'workout_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'workout_history',
      new TableForeignKey({
        columnNames: ['workout_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workouts',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert changes
    await queryRunner.dropForeignKey('workout_history', 'FK_Workout');
    await queryRunner.dropColumn('workout_history', 'workout_id');
    await queryRunner.addColumn(
      'workout_history',
      new TableColumn({
        name: 'exercise_id',
        type: 'int',
      }),
    );
    await queryRunner.dropColumns('workout_history', [
      new TableColumn({
        name: 'numberOfSets',
        type: 'int',
      }),
      new TableColumn({
        name: 'weights',
        type: 'int',
        isArray: true,
      }),
    ]);
    await queryRunner.renameTable('workout_history', 'user_exercise_history');
  }
}
