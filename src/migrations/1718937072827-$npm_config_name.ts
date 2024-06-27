import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1718937072827 implements MigrationInterface {
    name = ' $npmConfigName1718937072827'

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.query(`ALTER TABLE "user_package_meal_plans" ADD "package_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_package_meal_plans" ADD CONSTRAINT "FK_7c9ee9deeccc84949aea6a08900" FOREIGN KEY ("package_id") REFERENCES "coach_packages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_package_meal_plans" DROP CONSTRAINT "FK_7c9ee9deeccc84949aea6a08900"`);
        await queryRunner.query(`ALTER TABLE "user_package_meal_plans" DROP COLUMN "package_id"`);
    }

}
