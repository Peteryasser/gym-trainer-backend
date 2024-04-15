import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1712596061142 implements MigrationInterface {
    name = ' $npmConfigName1712596061142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Body_parts" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_29961c8de866465c23e39ba219c" UNIQUE ("name"), CONSTRAINT "PK_22199f4af0515a9a05cba0619eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instruction" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "order" integer NOT NULL DEFAULT '0', "exercise_id" integer, CONSTRAINT "PK_dd8def68dee37e3f878d0f8673a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Equipments" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_dc733b61364d2c51e1a8e7f21f1" UNIQUE ("name"), CONSTRAINT "PK_75224c2593be02a5210338315c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercises" ("id" SERIAL NOT NULL, "idApi" character varying(255) NOT NULL, "gifUrl" character varying(255) NOT NULL, "bodyPartId" integer, "targetMuscleId" integer, CONSTRAINT "UQ_a228925ab9a918197d3eea2769a" UNIQUE ("idApi"), CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Muscles" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_557dacc5efd494201789746b5c2" UNIQUE ("name"), CONSTRAINT "PK_2c66aae5c8a4a9cf838063d1045" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Ingredient_category" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "PK_26c9a5df7bc42f74b4aa9cd7943" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "category_id" integer NOT NULL, "calories" integer, "caloriesUnit" character varying, "carbs" integer, "carbsUnit" character varying, "protein" integer, "proteinUnit" character varying, "fat" integer, "fatUnit" character varying, "sugar" integer, "sugarUnit" character varying, "calcium" integer, "calciumUnit" character varying, "sodium" integer, "sodiumUnit" character varying, "vitamin_c" integer, "vitamin_c_unit" character varying, "fiber" integer, "fiberUnit" character varying, "potassium" integer, "potassiumUnit" character varying, "water" integer, "waterUnit" character varying, "saturated_fat" integer, "saturated_fat_unit" character varying, "mono_saturated_fat" integer, "mono_saturated_fat_unit" character varying, "poly_saturated_fat" integer, "poly_saturated_fat_unit" character varying, "cholesterol" integer, "cholesterolUnit" character varying, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipments_exercises_exercises" ("equipmentsId" integer NOT NULL, "exercisesId" integer NOT NULL, CONSTRAINT "PK_9d5bb0b398988a46d8369fe8651" PRIMARY KEY ("equipmentsId", "exercisesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_495bf68976b3647a9efb2a53a2" ON "equipments_exercises_exercises" ("equipmentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1fc13b5259fc11d1e499c867d0" ON "equipments_exercises_exercises" ("exercisesId") `);
        await queryRunner.query(`CREATE TABLE "exercises_secondary_muscles_muscles" ("exercisesId" integer NOT NULL, "musclesId" integer NOT NULL, CONSTRAINT "PK_619cfe06927f4db89124ddb24e2" PRIMARY KEY ("exercisesId", "musclesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d3e8e02f6765e949f8a030021a" ON "exercises_secondary_muscles_muscles" ("exercisesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b0dabab8034b4ef751d70fa5f5" ON "exercises_secondary_muscles_muscles" ("musclesId") `);
        await queryRunner.query(`CREATE TABLE "exercises_equipments_equipments" ("exercisesId" integer NOT NULL, "equipmentsId" integer NOT NULL, CONSTRAINT "PK_fcf858ac11ac3decc67f092fe16" PRIMARY KEY ("exercisesId", "equipmentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f7cf4113bdcf65a6750d13cf37" ON "exercises_equipments_equipments" ("exercisesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_18622ff4e3fb0cabc3d40268eb" ON "exercises_equipments_equipments" ("equipmentsId") `);
        await queryRunner.query(`ALTER TABLE "instruction" ADD CONSTRAINT "FK_5e07095ebc8952b101ec52a92b6" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_298599e6046068db08bf03a2ad7" FOREIGN KEY ("bodyPartId") REFERENCES "Body_parts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_95c8c5406fe71dbe599ad3f3702" FOREIGN KEY ("targetMuscleId") REFERENCES "Muscles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_60428d3b6f6ef96b3f3ed32ae83" FOREIGN KEY ("category_id") REFERENCES "Ingredient_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipments_exercises_exercises" ADD CONSTRAINT "FK_495bf68976b3647a9efb2a53a2b" FOREIGN KEY ("equipmentsId") REFERENCES "Equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "equipments_exercises_exercises" ADD CONSTRAINT "FK_1fc13b5259fc11d1e499c867d07" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises_secondary_muscles_muscles" ADD CONSTRAINT "FK_d3e8e02f6765e949f8a030021a2" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exercises_secondary_muscles_muscles" ADD CONSTRAINT "FK_b0dabab8034b4ef751d70fa5f5b" FOREIGN KEY ("musclesId") REFERENCES "Muscles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises_equipments_equipments" ADD CONSTRAINT "FK_f7cf4113bdcf65a6750d13cf37d" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exercises_equipments_equipments" ADD CONSTRAINT "FK_18622ff4e3fb0cabc3d40268eb5" FOREIGN KEY ("equipmentsId") REFERENCES "Equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises_equipments_equipments" DROP CONSTRAINT "FK_18622ff4e3fb0cabc3d40268eb5"`);
        await queryRunner.query(`ALTER TABLE "exercises_equipments_equipments" DROP CONSTRAINT "FK_f7cf4113bdcf65a6750d13cf37d"`);
        await queryRunner.query(`ALTER TABLE "exercises_secondary_muscles_muscles" DROP CONSTRAINT "FK_b0dabab8034b4ef751d70fa5f5b"`);
        await queryRunner.query(`ALTER TABLE "exercises_secondary_muscles_muscles" DROP CONSTRAINT "FK_d3e8e02f6765e949f8a030021a2"`);
        await queryRunner.query(`ALTER TABLE "equipments_exercises_exercises" DROP CONSTRAINT "FK_1fc13b5259fc11d1e499c867d07"`);
        await queryRunner.query(`ALTER TABLE "equipments_exercises_exercises" DROP CONSTRAINT "FK_495bf68976b3647a9efb2a53a2b"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_60428d3b6f6ef96b3f3ed32ae83"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_95c8c5406fe71dbe599ad3f3702"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_298599e6046068db08bf03a2ad7"`);
        await queryRunner.query(`ALTER TABLE "instruction" DROP CONSTRAINT "FK_5e07095ebc8952b101ec52a92b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18622ff4e3fb0cabc3d40268eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f7cf4113bdcf65a6750d13cf37"`);
        await queryRunner.query(`DROP TABLE "exercises_equipments_equipments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0dabab8034b4ef751d70fa5f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3e8e02f6765e949f8a030021a"`);
        await queryRunner.query(`DROP TABLE "exercises_secondary_muscles_muscles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1fc13b5259fc11d1e499c867d0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_495bf68976b3647a9efb2a53a2"`);
        await queryRunner.query(`DROP TABLE "equipments_exercises_exercises"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "Ingredient_category"`);
        await queryRunner.query(`DROP TABLE "Muscles"`);
        await queryRunner.query(`DROP TABLE "exercises"`);
        await queryRunner.query(`DROP TABLE "Equipments"`);
        await queryRunner.query(`DROP TABLE "instruction"`);
        await queryRunner.query(`DROP TABLE "Body_parts"`);
    }

}
