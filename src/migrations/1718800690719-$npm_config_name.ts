import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1718800690719 implements MigrationInterface {
    name = ' $npmConfigName1718800690719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "serving_size_g"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "calories" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "fat_total_g" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "fat_saturated_g" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "protein_g" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "sodium_mg" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "potassium_mg" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "cholesterol_mg" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "carbohydrates_total_g" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "fiber_g" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "sugar_g" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "sugar_g" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "fiber_g" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "carbohydrates_total_g" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "cholesterol_mg" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "potassium_mg" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "sodium_mg" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "protein_g" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "fat_saturated_g" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "fat_total_g" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "calories" SET NOT NULL`);
        
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "serving_size_g" real NOT NULL`);
        
    }

}
