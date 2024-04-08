import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1712607747641 implements MigrationInterface {
    name = ' $npmConfigName1712607747641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instruction" DROP CONSTRAINT "FK_5e07095ebc8952b101ec52a92b6"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_60428d3b6f6ef96b3f3ed32ae83"`);
        await queryRunner.query(`ALTER TABLE "instruction" RENAME COLUMN "exercise_id" TO "exerciseId"`);
        await queryRunner.query(`CREATE TABLE "ingredient_category" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_60428d3b6f6ef96b3f3ed32ae83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "potassium"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "water"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "saturated_fat"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "carbs"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "mono_saturated_fat"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "poly_saturated_fat"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "cholesterol"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "fat"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "calcium"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "sodium"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "vitamin_c"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "caloriesUnit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "carbsUnit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "proteinUnit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "fatUnit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "sugarUnit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "calciumUnit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "sodiumUnit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "vitamin_c_unit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "fiberUnit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "potassiumUnit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "waterUnit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "saturated_fat_unit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "mono_saturated_fat_unit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "poly_saturated_fat_unit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "cholesterolUnit"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "serving_size_g" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "fat_total_g" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "fat_saturated_g" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "sodium_mg" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "potassium_mg" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "cholesterol_mg" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "carbohydrates_total_g" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "imageURL" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "calories" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "protein" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "fiber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "sugar" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instruction" ADD CONSTRAINT "FK_db384098c47d938e7dcb63aa8a6" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_79432f69a73196229d097c8e2ee" FOREIGN KEY ("categoryId") REFERENCES "ingredient_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_79432f69a73196229d097c8e2ee"`);
        await queryRunner.query(`ALTER TABLE "instruction" DROP CONSTRAINT "FK_db384098c47d938e7dcb63aa8a6"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "sugar" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "fiber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "protein" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "calories" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "imageURL"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "carbohydrates_total_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "cholesterol_mg"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "potassium_mg"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "sodium_mg"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "fat_saturated_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "fat_total_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "serving_size_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "cholesterolUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "poly_saturated_fat_unit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "mono_saturated_fat_unit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "saturated_fat_unit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "waterUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "potassiumUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "fiberUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "vitamin_c_unit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "sodiumUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "calciumUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "sugarUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "fatUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "proteinUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "carbsUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "caloriesUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "vitamin_c" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "sodium" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "calcium" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "fat" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "cholesterol" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "poly_saturated_fat" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "mono_saturated_fat" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "carbs" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "saturated_fat" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "water" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "potassium" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "category_id" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "ingredient_category"`);
        await queryRunner.query(`ALTER TABLE "instruction" RENAME COLUMN "exerciseId" TO "exercise_id"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_60428d3b6f6ef96b3f3ed32ae83" FOREIGN KEY ("category_id") REFERENCES "Ingredient_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instruction" ADD CONSTRAINT "FK_5e07095ebc8952b101ec52a92b6" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
