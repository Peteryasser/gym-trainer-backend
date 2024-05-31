import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1713784922816 implements MigrationInterface {
    name = ' $npmConfigName1713784922816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "NotUser" ("id" SERIAL NOT NULL, "Notemail" character varying NOT NULL, "name" character varying(256) NOT NULL, "password" character varying NOT NULL, "otp" character varying, "otpExpiration" TIMESTAMP, CONSTRAINT "UQ_92fc456222823d8e6f27b5fb284" UNIQUE ("Notemail"), CONSTRAINT "PK_9b5453f41de84bfb191f9658e89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD "name" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TABLE "NotUser"`);
    }

}
