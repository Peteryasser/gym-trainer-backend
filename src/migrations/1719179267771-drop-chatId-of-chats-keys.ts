import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DropChatIdOfChatsKeys1719179267771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('chats_keys', 'chatId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'chats_keys',
      new TableColumn({
        name: 'chatId',
        type: 'int',
        isNullable: false,
        isUnique: true,
      }),
    );
  }
}
