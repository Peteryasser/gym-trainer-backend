import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1712588350181 implements MigrationInterface {
    name = ' $npmConfigName1712588350181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instruction" ALTER COLUMN "order" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "UQ_a228925ab9a918197d3eea2769a" UNIQUE ("idApi")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "UQ_a228925ab9a918197d3eea2769a"`);
        await queryRunner.query(`ALTER TABLE "instruction" ALTER COLUMN "order" DROP DEFAULT`);
    }

}
