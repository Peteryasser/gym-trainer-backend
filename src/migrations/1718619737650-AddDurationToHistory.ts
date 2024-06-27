import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDurationToHistory1718619737650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('workout_history', [
      new TableColumn({
        name: 'duration',
        type: 'int',
      }),
      new TableColumn({
        name: 'durationUnit',
        type: 'varchar',
        length: '10',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('workout_history', 'duration');
    await queryRunner.dropColumn('workout_history', 'durationUnit');
  }
}
