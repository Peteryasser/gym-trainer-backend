import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1711059858096 implements MigrationInterface {
    name = ' $npmConfigName1711059858096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Body_part" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_77e532d7f56c0eb135e33db19dd" UNIQUE ("name"), CONSTRAINT "PK_fbc35dfd376be6ac6d6fc4924b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instruction" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "order" integer NOT NULL, "exercise_id" integer, CONSTRAINT "PK_dd8def68dee37e3f878d0f8673a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Equipments" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_dc733b61364d2c51e1a8e7f21f1" UNIQUE ("name"), CONSTRAINT "PK_75224c2593be02a5210338315c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercises" ("id" SERIAL NOT NULL, "idApi" character varying(255) NOT NULL, "gifUrl" character varying(255) NOT NULL, "bodyPartId" integer, "targetMuscleId" integer, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Muscles" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_557dacc5efd494201789746b5c2" UNIQUE ("name"), CONSTRAINT "PK_2c66aae5c8a4a9cf838063d1045" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercises_secondary_muscles_muscles" ("exercisesId" integer NOT NULL, "musclesId" integer NOT NULL, CONSTRAINT "PK_619cfe06927f4db89124ddb24e2" PRIMARY KEY ("exercisesId", "musclesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d3e8e02f6765e949f8a030021a" ON "exercises_secondary_muscles_muscles" ("exercisesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b0dabab8034b4ef751d70fa5f5" ON "exercises_secondary_muscles_muscles" ("musclesId") `);
        await queryRunner.query(`CREATE TABLE "exercises_equipments_equipments" ("exercisesId" integer NOT NULL, "equipmentsId" integer NOT NULL, CONSTRAINT "PK_fcf858ac11ac3decc67f092fe16" PRIMARY KEY ("exercisesId", "equipmentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f7cf4113bdcf65a6750d13cf37" ON "exercises_equipments_equipments" ("exercisesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_18622ff4e3fb0cabc3d40268eb" ON "exercises_equipments_equipments" ("equipmentsId") `);
        await queryRunner.query(`ALTER TABLE "instruction" ADD CONSTRAINT "FK_5e07095ebc8952b101ec52a92b6" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_298599e6046068db08bf03a2ad7" FOREIGN KEY ("bodyPartId") REFERENCES "Body_part"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_95c8c5406fe71dbe599ad3f3702" FOREIGN KEY ("targetMuscleId") REFERENCES "Muscles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_95c8c5406fe71dbe599ad3f3702"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_298599e6046068db08bf03a2ad7"`);
        await queryRunner.query(`ALTER TABLE "instruction" DROP CONSTRAINT "FK_5e07095ebc8952b101ec52a92b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18622ff4e3fb0cabc3d40268eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f7cf4113bdcf65a6750d13cf37"`);
        await queryRunner.query(`DROP TABLE "exercises_equipments_equipments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0dabab8034b4ef751d70fa5f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3e8e02f6765e949f8a030021a"`);
        await queryRunner.query(`DROP TABLE "exercises_secondary_muscles_muscles"`);
        await queryRunner.query(`DROP TABLE "Muscles"`);
        await queryRunner.query(`DROP TABLE "exercises"`);
        await queryRunner.query(`DROP TABLE "Equipments"`);
        await queryRunner.query(`DROP TABLE "instruction"`);
        await queryRunner.query(`DROP TABLE "Body_part"`);
    }

}
