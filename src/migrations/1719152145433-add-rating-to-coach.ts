import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRatingToCoach1719152145433 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'coaches',
      new TableColumn({
        name: 'rating',
        type: 'float',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('coaches', 'rating');
  }
}
