import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNotificationsType1717506058782 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'notifications',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enum: ['new_subscription', 'new_post', 'post_like', 'new_review'],
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('notifications', 'type');
  }
}
