import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AllowdescriptionTobeTrueInWorkout1719519702672
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'workouts',
      'description',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'workouts',
      'description',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        length: '255',
        isNullable: false,
      }),
    );
  }
}
