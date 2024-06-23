import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716192089521 implements MigrationInterface {
    name = ' $npmConfigName1716192089521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_package_workout_plan" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "workoutplan_id" integer NOT NULL, "package_id" integer NOT NULL, CONSTRAINT "PK_d44d7d7cefa92f912ebe325c222" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saved_workouts" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "workout_id" integer NOT NULL, CONSTRAINT "PK_97a64aca702a599f41b74fce020" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_package_workout_plan" ADD CONSTRAINT "FK_88ecec97e868a8cc8d28f2909a6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_package_workout_plan" ADD CONSTRAINT "FK_0bf51d2094186fd5dcc8e1a092a" FOREIGN KEY ("workoutplan_id") REFERENCES "workout_plans"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_package_workout_plan" ADD CONSTRAINT "FK_8a72f4d8355e980a75e382ee7ef" FOREIGN KEY ("package_id") REFERENCES "coach_packages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_workouts" ADD CONSTRAINT "FK_15e42a9650cf903de07ffb2b55f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_workouts" ADD CONSTRAINT "FK_2a02bff30d854161efdfb929f26" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saved_workouts" DROP CONSTRAINT "FK_2a02bff30d854161efdfb929f26"`);
        await queryRunner.query(`ALTER TABLE "saved_workouts" DROP CONSTRAINT "FK_15e42a9650cf903de07ffb2b55f"`);
        await queryRunner.query(`ALTER TABLE "user_package_workout_plan" DROP CONSTRAINT "FK_8a72f4d8355e980a75e382ee7ef"`);
        await queryRunner.query(`ALTER TABLE "user_package_workout_plan" DROP CONSTRAINT "FK_0bf51d2094186fd5dcc8e1a092a"`);
        await queryRunner.query(`ALTER TABLE "user_package_workout_plan" DROP CONSTRAINT "FK_88ecec97e868a8cc8d28f2909a6"`);
        await queryRunner.query(`DROP TABLE "saved_workouts"`);
        await queryRunner.query(`DROP TABLE "user_package_workout_plan"`);
    }

}
