import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DropNotificationsLink1717506947778 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('notifications', 'link');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'notifications',
      new TableColumn({ name: 'link', type: 'varchar', isNullable: true }),
    );
  }
}
