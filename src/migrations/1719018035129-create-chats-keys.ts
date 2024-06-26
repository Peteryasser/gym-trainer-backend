import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateChatsKeys1719018035129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chats_keys',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'chatId',
            type: 'int',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'userAId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'userBId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'symmetricEncryptedByPubA',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'symmetricEncryptedByPubB',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_on',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'chats_keys',
      new TableForeignKey({
        columnNames: ['userAId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'chats_keys',
      new TableForeignKey({
        columnNames: ['userBId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chats_keys');
  }
}
