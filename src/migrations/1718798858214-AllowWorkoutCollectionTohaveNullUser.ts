import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AllowWorkoutCollectionTohaveNullUser1718798858214
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'workout_collections',
      'user_id',
      new TableColumn({
        name: 'user_id',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'workout_collections',
      'user_id',
      new TableColumn({
        name: 'user_id',
        type: 'int',
        isNullable: false,
      }),
    );
  }
}
