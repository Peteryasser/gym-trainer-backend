import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1718493606942 implements MigrationInterface {
    name = ' $npmConfigName1718493606942'

    public async up(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "protein"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "fiber"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "sugar"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "protein_g" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "fiber_g" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "sugar_g" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "calories"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "calories" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "serving_size_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "serving_size_g" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "fat_total_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "fat_total_g" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "fat_saturated_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "fat_saturated_g" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "sodium_mg"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "sodium_mg" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "potassium_mg"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "potassium_mg" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "cholesterol_mg"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "cholesterol_mg" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "carbohydrates_total_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "carbohydrates_total_g" real NOT NULL`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "carbohydrates_total_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "carbohydrates_total_g" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "cholesterol_mg"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "cholesterol_mg" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "potassium_mg"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "potassium_mg" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "sodium_mg"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "sodium_mg" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "fat_saturated_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "fat_saturated_g" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "fat_total_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "fat_total_g" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "serving_size_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "serving_size_g" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "calories"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "calories" double precision NOT NULL`);
        
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "sugar_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "fiber_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "protein_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "sugar" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "fiber" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "protein" double precision NOT NULL`);
        
    }

}
