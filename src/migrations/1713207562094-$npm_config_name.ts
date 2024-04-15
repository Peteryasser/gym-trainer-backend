import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1713207562094 implements MigrationInterface {
    name = ' $npmConfigName1713207562094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "devices" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "fcmToken" character varying NOT NULL, "isLoggedOut" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coaches" ("id" SERIAL NOT NULL, "user_id" integer, CONSTRAINT "REL_bd9923ac72efde2d5895e118fa" UNIQUE ("user_id"), CONSTRAINT "PK_eddaece1a1f1b197fa39e6864a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "username" character varying(100) NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "password" character varying(255), "gender" character varying(10) NOT NULL, "profilePictureUrl" character varying(255), "countryCode" character varying(10) NOT NULL, "phoneNumber" character varying(20) NOT NULL, "dateOfBirth" date, "verificationToken" character varying(6), "verificationTokenSentAt" TIMESTAMP, "resetPasswordToken" character varying(6), "resetPasswordTokenSentAt" TIMESTAMP, "isEmailVerified" boolean NOT NULL DEFAULT false, "isSocialAccount" boolean NOT NULL DEFAULT false, "enableNotifications" boolean NOT NULL DEFAULT true, "defaultLocale" character varying(10) NOT NULL DEFAULT 'en', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "NotUser" ("id" SERIAL NOT NULL, "Notemail" character varying NOT NULL, "name" character varying(256) NOT NULL, "password" character varying NOT NULL, "otp" character varying, "otpExpiration" TIMESTAMP, CONSTRAINT "UQ_92fc456222823d8e6f27b5fb284" UNIQUE ("Notemail"), CONSTRAINT "PK_9b5453f41de84bfb191f9658e89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Body_parts" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_29961c8de866465c23e39ba219c" UNIQUE ("name"), CONSTRAINT "PK_22199f4af0515a9a05cba0619eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instruction" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "order" integer NOT NULL DEFAULT '0', "exerciseId" integer, CONSTRAINT "PK_dd8def68dee37e3f878d0f8673a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Equipments" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_dc733b61364d2c51e1a8e7f21f1" UNIQUE ("name"), CONSTRAINT "PK_75224c2593be02a5210338315c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercises" ("id" SERIAL NOT NULL, "idApi" character varying(255) NOT NULL, "gifUrl" character varying(255) NOT NULL, "bodyPartId" integer, "targetMuscleId" integer, CONSTRAINT "UQ_a228925ab9a918197d3eea2769a" UNIQUE ("idApi"), CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Muscles" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_557dacc5efd494201789746b5c2" UNIQUE ("name"), CONSTRAINT "PK_2c66aae5c8a4a9cf838063d1045" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "calories" integer NOT NULL, "serving_size_g" integer NOT NULL, "fat_total_g" integer NOT NULL, "fat_saturated_g" integer NOT NULL, "protein" integer NOT NULL, "sodium_mg" integer NOT NULL, "potassium_mg" integer NOT NULL, "cholesterol_mg" integer NOT NULL, "carbohydrates_total_g" integer NOT NULL, "fiber" integer NOT NULL, "sugar" integer NOT NULL, "imageURL" character varying, "categoryId" integer, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient_category" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_60428d3b6f6ef96b3f3ed32ae83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipments_exercises_exercises" ("equipmentsId" integer NOT NULL, "exercisesId" integer NOT NULL, CONSTRAINT "PK_9d5bb0b398988a46d8369fe8651" PRIMARY KEY ("equipmentsId", "exercisesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_495bf68976b3647a9efb2a53a2" ON "equipments_exercises_exercises" ("equipmentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1fc13b5259fc11d1e499c867d0" ON "equipments_exercises_exercises" ("exercisesId") `);
        await queryRunner.query(`CREATE TABLE "exercises_secondary_muscles_muscles" ("exercisesId" integer NOT NULL, "musclesId" integer NOT NULL, CONSTRAINT "PK_619cfe06927f4db89124ddb24e2" PRIMARY KEY ("exercisesId", "musclesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d3e8e02f6765e949f8a030021a" ON "exercises_secondary_muscles_muscles" ("exercisesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b0dabab8034b4ef751d70fa5f5" ON "exercises_secondary_muscles_muscles" ("musclesId") `);
        await queryRunner.query(`CREATE TABLE "exercises_equipments_equipments" ("exercisesId" integer NOT NULL, "equipmentsId" integer NOT NULL, CONSTRAINT "PK_fcf858ac11ac3decc67f092fe16" PRIMARY KEY ("exercisesId", "equipmentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f7cf4113bdcf65a6750d13cf37" ON "exercises_equipments_equipments" ("exercisesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_18622ff4e3fb0cabc3d40268eb" ON "exercises_equipments_equipments" ("equipmentsId") `);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_5e9bee993b4ce35c3606cda194c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coaches" ADD CONSTRAINT "FK_bd9923ac72efde2d5895e118fa8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instruction" ADD CONSTRAINT "FK_db384098c47d938e7dcb63aa8a6" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_298599e6046068db08bf03a2ad7" FOREIGN KEY ("bodyPartId") REFERENCES "Body_parts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_95c8c5406fe71dbe599ad3f3702" FOREIGN KEY ("targetMuscleId") REFERENCES "Muscles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_79432f69a73196229d097c8e2ee" FOREIGN KEY ("categoryId") REFERENCES "ingredient_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_79432f69a73196229d097c8e2ee"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_95c8c5406fe71dbe599ad3f3702"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_298599e6046068db08bf03a2ad7"`);
        await queryRunner.query(`ALTER TABLE "instruction" DROP CONSTRAINT "FK_db384098c47d938e7dcb63aa8a6"`);
        await queryRunner.query(`ALTER TABLE "coaches" DROP CONSTRAINT "FK_bd9923ac72efde2d5895e118fa8"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_5e9bee993b4ce35c3606cda194c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18622ff4e3fb0cabc3d40268eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f7cf4113bdcf65a6750d13cf37"`);
        await queryRunner.query(`DROP TABLE "exercises_equipments_equipments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0dabab8034b4ef751d70fa5f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3e8e02f6765e949f8a030021a"`);
        await queryRunner.query(`DROP TABLE "exercises_secondary_muscles_muscles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1fc13b5259fc11d1e499c867d0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_495bf68976b3647a9efb2a53a2"`);
        await queryRunner.query(`DROP TABLE "equipments_exercises_exercises"`);
        await queryRunner.query(`DROP TABLE "ingredient_category"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "Muscles"`);
        await queryRunner.query(`DROP TABLE "exercises"`);
        await queryRunner.query(`DROP TABLE "Equipments"`);
        await queryRunner.query(`DROP TABLE "instruction"`);
        await queryRunner.query(`DROP TABLE "Body_parts"`);
        await queryRunner.query(`DROP TABLE "NotUser"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "coaches"`);
        await queryRunner.query(`DROP TABLE "devices"`);
    }

}
