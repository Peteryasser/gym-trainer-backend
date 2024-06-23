import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716205468213 implements MigrationInterface {
    name = ' $npmConfigName1716205468213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" ADD "type" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "type"`);
    }

}
