import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1719188894346 implements MigrationInterface {
    name = ' $npmConfigName1719188894346'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "total_calories"`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "total_calories" real NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "total_calories"`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "total_calories" integer NOT NULL`);
    }

}
