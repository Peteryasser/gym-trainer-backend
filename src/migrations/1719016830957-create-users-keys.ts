import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUsersKeys1719016830957 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'users_keys',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          { name: 'userId', type: 'int', isNullable: false, isUnique: true },
          {
            name: 'publicKey',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'encryptedPrivateKey',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'users_keys',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_keys');
  }
}
