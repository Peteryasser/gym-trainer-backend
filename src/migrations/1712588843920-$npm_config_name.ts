import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1712588843920 implements MigrationInterface {
    name = ' $npmConfigName1712588843920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Ingredient_category" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "PK_26c9a5df7bc42f74b4aa9cd7943" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "category_id" integer NOT NULL, "calories" integer, "caloriesUnit" character varying, "carbs" integer, "carbsUnit" character varying, "protein" integer, "proteinUnit" character varying, "fat" integer, "fatUnit" character varying, "sugar" integer, "sugarUnit" character varying, "calcium" integer, "calciumUnit" character varying, "sodium" integer, "sodiumUnit" character varying, "vitamin_c" integer, "vitamin_c_unit" character varying, "fiber" integer, "fiberUnit" character varying, "potassium" integer, "potassiumUnit" character varying, "water" integer, "waterUnit" character varying, "saturated_fat" integer, "saturated_fat_unit" character varying, "mono_saturated_fat" integer, "mono_saturated_fat_unit" character varying, "poly_saturated_fat" integer, "poly_saturated_fat_unit" character varying, "cholesterol" integer, "cholesterolUnit" character varying, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "instruction" ALTER COLUMN "order" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "UQ_a228925ab9a918197d3eea2769a" UNIQUE ("idApi")`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_60428d3b6f6ef96b3f3ed32ae83" FOREIGN KEY ("category_id") REFERENCES "Ingredient_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_60428d3b6f6ef96b3f3ed32ae83"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "UQ_a228925ab9a918197d3eea2769a"`);
        await queryRunner.query(`ALTER TABLE "instruction" ALTER COLUMN "order" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "Ingredient_category"`);
    }

}
