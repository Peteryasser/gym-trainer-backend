import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716102651966 implements MigrationInterface {
    name = ' $npmConfigName1716102651966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "countryCode" SET DEFAULT '+20'`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_d05e8618f5b30e7eb49952a531b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_d05e8618f5b30e7eb49952a531b"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "countryCode" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "user_id"`);
    }

}
