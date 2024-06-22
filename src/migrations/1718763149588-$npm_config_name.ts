import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1718763149588 implements MigrationInterface {
    name = ' $npmConfigName1718763149588'

    public async up(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ADD "amount" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ADD "unit" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "servings" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "servings"`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" DROP COLUMN "amount"`);
    }

}
