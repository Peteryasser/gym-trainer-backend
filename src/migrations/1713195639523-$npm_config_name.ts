import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1713195639523 implements MigrationInterface {
    name = ' $npmConfigName1713195639523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying(256) NOT NULL, "password" character varying NOT NULL, "otp" character varying, "otpExpiration" TIMESTAMP, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "NotUser" ("id" SERIAL NOT NULL, "Notemail" character varying NOT NULL, "name" character varying(256) NOT NULL, "password" character varying NOT NULL, "otp" character varying, "otpExpiration" TIMESTAMP, CONSTRAINT "UQ_92fc456222823d8e6f27b5fb284" UNIQUE ("Notemail"), CONSTRAINT "PK_9b5453f41de84bfb191f9658e89" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "NotUser"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
