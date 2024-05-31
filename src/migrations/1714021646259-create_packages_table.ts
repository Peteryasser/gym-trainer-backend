import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePackagesTable1714021646259 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'coach_packages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },

          {
            name: 'durationUnit',
            type: 'enum',
            enum: ['day', 'week', 'month', 'year'],
            default: "'month'",
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'hasNutrition',
            type: 'boolean',
            default: false,
          },
          {
            name: 'coachId',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'coach_packages',
      new TableForeignKey({
        columnNames: ['coachId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'coaches',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('coach_packages');
  }
}
