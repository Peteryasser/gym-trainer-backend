import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1710118893512 implements MigrationInterface {
    name = ' $npmConfigName1710118893512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying(256) NOT NULL, "password" character varying NOT NULL, "otp" character varying, "otpExpiration" TIMESTAMP, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
