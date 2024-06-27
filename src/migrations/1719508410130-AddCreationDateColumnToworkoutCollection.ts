import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCreationDateColumnToworkoutCollection1719508410130
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'workout_collections',
      new TableColumn({
        name: 'creationDate',
        type: 'date',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('workout_collections', 'creationDate');
  }
}
