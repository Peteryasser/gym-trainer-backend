import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveNotificationsTitle1717505686764
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('notifications', 'title');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn(
      'notifications',
      new TableColumn({ name: 'title', type: 'varchar', length: '255' }),
    );
  }
}
