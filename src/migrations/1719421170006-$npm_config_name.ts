import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1719421170006 implements MigrationInterface {
    name = ' $npmConfigName1719421170006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_plans" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meal_plans" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meal_plans" ADD CONSTRAINT "FK_a94a25c51cc9b60a3c542c98986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_plans" DROP CONSTRAINT "FK_a94a25c51cc9b60a3c542c98986"`);
        await queryRunner.query(`ALTER TABLE "meal_plans" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "meal_plans" DROP COLUMN "name"`);
    }

}
