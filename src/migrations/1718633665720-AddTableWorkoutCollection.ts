import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTableWorkoutCollection1718633665720
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create workout_collections table
    await queryRunner.createTable(
      new Table({
        name: 'workout_collections',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'boolean',
            default: false,
          },
          {
            name: 'user_id',
            type: 'int',
          },
        ],
      }),
      true,
    );

    // Add foreign key to user_id in workout_collections
    await queryRunner.createForeignKey(
      'workout_collections',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    // Create workout_collection_details table
    await queryRunner.createTable(
      new Table({
        name: 'workout_collection_details',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'workout_collection_id',
            type: 'int',
          },
          {
            name: 'workout_id',
            type: 'int',
          },
        ],
      }),
      true,
    );

    // Add foreign key to workout_collection_id in workout_collection_details
    await queryRunner.createForeignKey(
      'workout_collection_details',
      new TableForeignKey({
        columnNames: ['workout_collection_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workout_collections',
        onDelete: 'CASCADE',
      }),
    );

    // Add foreign key to workout_id in workout_collection_details
    await queryRunner.createForeignKey(
      'workout_collection_details',
      new TableForeignKey({
        columnNames: ['workout_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'workouts',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop workout_collection_details table and foreign keys
    await queryRunner.dropTable('workout_collection_details');

    // Drop workout_collections table and foreign keys
    await queryRunner.dropTable('workout_collections');
  }
}
