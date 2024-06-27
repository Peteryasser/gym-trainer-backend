import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLikesToCoachPosts1719237498802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'coach_posts',
      new TableColumn({
        name: 'likesNo',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('coach_posts', 'likesNo');
  }
}
