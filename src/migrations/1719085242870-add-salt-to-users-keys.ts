import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSaltToUsersKeys1719085242870 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users_keys',
      new TableColumn({
        name: 'salt',
        type: 'text',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users_keys', 'salt');
  }
}
