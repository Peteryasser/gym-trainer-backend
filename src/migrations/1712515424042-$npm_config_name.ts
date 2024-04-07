import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1712515424042 implements MigrationInterface {
    name = ' $npmConfigName1712515424042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instruction" DROP CONSTRAINT "FK_5e07095ebc8952b101ec52a92b6"`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" SERIAL NOT NULL, "idApi" character varying(255) NOT NULL, "gifUrl" character varying(255) NOT NULL, "bodyPartId" integer, "targetMuscleId" integer, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Ingredient_category" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "PK_26c9a5df7bc42f74b4aa9cd7943" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "category_id" integer NOT NULL, "calories" integer, "caloriesUnit" character varying, "carbs" integer, "carbsUnit" character varying, "protein" integer, "proteinUnit" character varying, "fat" integer, "fatUnit" character varying, "sugar" integer, "sugarUnit" character varying, "calcium" integer, "calciumUnit" character varying, "sodium" integer, "sodiumUnit" character varying, "vitamin_c" integer, "vitamin_c_unit" character varying, "fiber" integer, "fiberUnit" character varying, "potassium" integer, "potassiumUnit" character varying, "water" integer, "waterUnit" character varying, "saturated_fat" integer, "saturated_fat_unit" character varying, "mono_saturated_fat" integer, "mono_saturated_fat_unit" character varying, "poly_saturated_fat" integer, "poly_saturated_fat_unit" character varying, "cholesterol" integer, "cholesterolUnit" character varying, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise_secondary_muscles_muscles" ("exerciseId" integer NOT NULL, "musclesId" integer NOT NULL, CONSTRAINT "PK_bc665529fbd6bfc3bc398454142" PRIMARY KEY ("exerciseId", "musclesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ed524b9a75cf6098d4df0af339" ON "exercise_secondary_muscles_muscles" ("exerciseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3fd2aadf83537f73171a43ba88" ON "exercise_secondary_muscles_muscles" ("musclesId") `);
        await queryRunner.query(`CREATE TABLE "exercise_equipments_equipments" ("exerciseId" integer NOT NULL, "equipmentsId" integer NOT NULL, CONSTRAINT "PK_ed8eca657b8219e567a25b4ae0e" PRIMARY KEY ("exerciseId", "equipmentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_81a7343a6a2fc438080bc6b258" ON "exercise_equipments_equipments" ("exerciseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_04d10f355d9f031e88875bd416" ON "exercise_equipments_equipments" ("equipmentsId") `);
        await queryRunner.query(`ALTER TABLE "instruction" ADD CONSTRAINT "FK_5e07095ebc8952b101ec52a92b6" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_36d94779d421c5950d3d6c2ac47" FOREIGN KEY ("bodyPartId") REFERENCES "Body_part"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_986cce0bf358b227acd3e28f611" FOREIGN KEY ("targetMuscleId") REFERENCES "Muscles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_60428d3b6f6ef96b3f3ed32ae83" FOREIGN KEY ("category_id") REFERENCES "Ingredient_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise_secondary_muscles_muscles" ADD CONSTRAINT "FK_ed524b9a75cf6098d4df0af3390" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exercise_secondary_muscles_muscles" ADD CONSTRAINT "FK_3fd2aadf83537f73171a43ba88c" FOREIGN KEY ("musclesId") REFERENCES "Muscles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise_equipments_equipments" ADD CONSTRAINT "FK_81a7343a6a2fc438080bc6b258a" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exercise_equipments_equipments" ADD CONSTRAINT "FK_04d10f355d9f031e88875bd4165" FOREIGN KEY ("equipmentsId") REFERENCES "Equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise_equipments_equipments" DROP CONSTRAINT "FK_04d10f355d9f031e88875bd4165"`);
        await queryRunner.query(`ALTER TABLE "exercise_equipments_equipments" DROP CONSTRAINT "FK_81a7343a6a2fc438080bc6b258a"`);
        await queryRunner.query(`ALTER TABLE "exercise_secondary_muscles_muscles" DROP CONSTRAINT "FK_3fd2aadf83537f73171a43ba88c"`);
        await queryRunner.query(`ALTER TABLE "exercise_secondary_muscles_muscles" DROP CONSTRAINT "FK_ed524b9a75cf6098d4df0af3390"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_60428d3b6f6ef96b3f3ed32ae83"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_986cce0bf358b227acd3e28f611"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_36d94779d421c5950d3d6c2ac47"`);
        await queryRunner.query(`ALTER TABLE "instruction" DROP CONSTRAINT "FK_5e07095ebc8952b101ec52a92b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04d10f355d9f031e88875bd416"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_81a7343a6a2fc438080bc6b258"`);
        await queryRunner.query(`DROP TABLE "exercise_equipments_equipments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3fd2aadf83537f73171a43ba88"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed524b9a75cf6098d4df0af339"`);
        await queryRunner.query(`DROP TABLE "exercise_secondary_muscles_muscles"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "Ingredient_category"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`ALTER TABLE "instruction" ADD CONSTRAINT "FK_5e07095ebc8952b101ec52a92b6" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
