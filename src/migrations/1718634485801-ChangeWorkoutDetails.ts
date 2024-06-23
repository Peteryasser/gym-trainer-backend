import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UpdateWorkoutPlanDetails1718634485801
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key to workout_id in workout_plan_details
    const table = await queryRunner.getTable('workout_plan_details');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('workout_id') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('workout_plan_details', foreignKey);
    }

    // Drop workout_id column
    await queryRunner.dropColumn('workout_plan_details', 'workout_id');

    // Add workout_collection_id column
    await queryRunner.addColumn(
      'workout_plan_details',
      new TableColumn({
        name: 'workout_collection_id',
        type: 'int',
        isNullable: false,
      }),
    );

    // Add foreign key to workout_collection_id in workout_plan_details
    await queryRunner.createForeignKey(
      'workout_plan_details',
      new TableForeignKey({
        columnNames: ['workout_collection_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workout_collections',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key to workout_collection_id in workout_plan_details
    const table = await queryRunner.getTable('workout_plan_details');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('workout_collection_id') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('workout_plan_details', foreignKey);
    }

    // Drop workout_collection_id column
    await queryRunner.dropColumn(
      'workout_plan_details',
      'workout_collection_id',
    );

    // Add workout_id column
    await queryRunner.addColumn(
      'workout_plan_details',
      new TableColumn({
        name: 'workout_id',
        type: 'int',
        isNullable: false,
      }),
    );

    // Add foreign key to workout_id in workout_plan_details
    await queryRunner.createForeignKey(
      'workout_plan_details',
      new TableForeignKey({
        columnNames: ['workout_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workouts',
        onDelete: 'CASCADE',
      }),
    );
  }
}
