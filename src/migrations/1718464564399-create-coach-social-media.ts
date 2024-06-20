import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCoachSocialMedia1718464564399 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'coach_social_media_accounts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          { name: 'coachId', type: 'int', isNullable: false },
          {
            name: 'handle',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'platform',
            type: 'enum',
            enum: ['facebook', 'instagram', 'x', 'discord', 'other'],
            isNullable: false,
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
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'coach_social_media_accounts',
      new TableForeignKey({
        columnNames: ['coachId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'coaches',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('coach_social_media_accounts');

    const foreignKeyCoach = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('coachId') !== -1,
    );

    await queryRunner.dropForeignKey(
      'coach_social_media_accounts',
      foreignKeyCoach,
    );
    await queryRunner.dropTable('coach_social_media_accounts');
  }
}
