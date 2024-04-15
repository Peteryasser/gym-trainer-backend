import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1709785233699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'email', type: 'varchar', length: '255', isUnique: true },
          { name: 'username', type: 'varchar', length: '100', isUnique: true },
          { name: 'firstName', type: 'varchar', length: '100' },
          { name: 'lastName', type: 'varchar', length: '100' },
          { name: 'password', type: 'varchar', length: '255' },
          { name: 'gender', type: 'varchar', length: '10' },
          {
            name: 'profilePictureUrl',
            type: 'varchar',
            length: '255',
          },
          { name: 'countryCode', type: 'varchar', length: '10' },
          { name: 'phoneNumber', type: 'varchar', length: '20' },
          { name: 'dateOfBirth', type: 'date' },
          {
            name: 'verificationToken',
            type: 'varchar',
            length: '6',
          },
          {
            name: 'verificationTokenSentAt',
            type: 'timestamp',
          },
          {
            name: 'resetPasswordToken',
            type: 'varchar',
            length: '6',
          },
          {
            name: 'resetPasswordTokenSentAt',
            type: 'timestamp',
          },
          { name: 'isEmailVerified', type: 'boolean', default: false },
          { name: 'isSocialAccount', type: 'boolean', default: false },
          { name: 'enableNotifications', type: 'boolean', default: true },
          {
            name: 'defaultLocale',
            type: 'varchar',
            length: '10',
            default: "'en'",
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
